import ShowResultPage from "@/components/pages/ShowResult";
import { QuestionDetail, questionsMock } from "@/constants/mock";
import { answerApi, questionApi } from "@/services/quiz.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/color";
import CustomModal from "./answer_modal";

export default function QuizIndex() {
    const router = useRouter();

    const [question, setQuestion] = useState<QuestionDetail | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [visible, setVisible] = useState(false);
    const [answer, setAnswer] = useState<any>({});
    const [score, setScore] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [endQuiz, setEndQuiz] = useState(false);

    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = async () => {
        try {
            const value = await AsyncStorage.getItem("isMock");
            const isMock = value && JSON.parse(value);

            if (isMock) {
                const mockQuestion = questionsMock.data;
                setQuestion(mockQuestion ?? null);
            } else {
                setIsLoading(true);
                const apiQuestion = await questionApi();
                setIsLoading(false);

                // Check if the API returned a question
                if (!apiQuestion) {
                    setEndQuiz(true);
                    setShowResult(true);
                    return;
                }

                setQuestion(apiQuestion ?? null);
                setStartTime(Date.now());
            }
        } catch (error) {
            console.error("Error loading question:", error);
            router.replace("/");
        }
    };

    const handleOptionPress = async (selected: string) => {
        try {
            const sessionId = (await AsyncStorage.getItem("sessionId")) || "mock-session-id";
            const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
            const payload = {
                sessionId,
                questionId: question?.questionId,
                choiceId: selected,
                timeSpent: timeSpent,
            };

            setIsSubmitting(true);
            const res = await answerApi(payload);
            setIsSubmitting(false);

            const currentAnswer = {
                isCorrect: res.isCorrect,
                timeSpent: res.timeSpent,
            };

            if (res.isCorrect) setScore((prev) => prev + 1);

            setAnswer(currentAnswer);
            setVisible(true);
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    const onCloseModal = () => {
        setVisible(false);

        loadQuestion();
        if (!endQuiz) {
            setCurrentIndex((prev) => prev + 1)
        };
    };

    const restartQuiz = () => {
        setScore(0);
        setCurrentIndex(1);
        setShowResult(false);
        setQuestion(null);

        router.replace("/");
    };

    if (showResult) {
        return (
            <ShowResultPage 
                score={score}
                numberOfQuestions={currentIndex}
                onPress={restartQuiz}
            />
        );
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.questionText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!isLoading && (
                <View>
                    {question && (
                        <Text style={styles.questionText}>
                            QUESTION {currentIndex}: {question.title}
                        </Text>
                    )}

                    {question?.choices?.map((option) => (
                        <TouchableOpacity
                            key={option.choiceId}
                            style={styles.button}
                            disabled={isSubmitting}
                            onPress={() => handleOptionPress(option.choiceId)}
                        >
                            <Text style={styles.buttonText}>
                                {option.title ?? "ไม่มีคำตอบจากระบบ"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <CustomModal visible={visible} answer={answer} onClose={onCloseModal} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: COLORS.background || "#fff",
    },
    questionText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    button: {
        backgroundColor: COLORS.primary || "#3498db",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.white || "#fff",
    },
    scoreText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "center",
        color: "#4caf50",
    },
});
