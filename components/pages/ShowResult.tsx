import { COLORS } from "@/constants/color";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuestionDetailProps {
    readonly score: number;
    readonly numberOfQuestions: number;
    readonly onPress: () => void;
}

export default function ShowResultPage({
    score,
    numberOfQuestions,
    onPress
}: QuestionDetailProps) {
    const checkScore = () => {
        if(score >= 8) return "Excellent";
        if(score >= 5) return "Pass";
        return "Fail";
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <Text style={styles.titleText}>QUIZ ENDING!</Text>
            </View>

            <View style={styles.boxResult}>
                <Text>Score Is</Text>
                <Text style={styles.score}>{score}/ {numberOfQuestions}</Text>
                <Text>Result: {checkScore()}</Text>

                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    titleHeader: {
        marginTop: 30,
        paddingHorizontal: 20
    },
    titleText: {
        fontSize: 20,
        fontWeight: "500",
    },
    boxResult: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100,
    },
    score: {
        fontSize:40,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 200,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase"
    }
});