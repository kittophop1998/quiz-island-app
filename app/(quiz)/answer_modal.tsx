import { COLORS } from "@/constants/color";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    visible: boolean;
    answer: {
        isCorrect: boolean;
        timeSpent: number;
    };
    onClose?: () => void;
};

export default function CustomModal({
    visible,
    answer,
    onClose,
}: Props) {
    const isCorrect = answer.isCorrect;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Your Answer Is</Text>

                    <Text style={[styles.icon, { color: isCorrect ? "#4CAF50" : "#F44336" }]}>
                        {isCorrect ? <AntDesign name="check" size={24} color="green" /> : <Feather name="x" size={24} color="red" />}
                    </Text>

                    <Text
                        style={[
                            styles.resultText,
                            { color: isCorrect ? "#4CAF50" : "#F44336" },
                        ]}
                    >
                        {isCorrect ? "Correct" : "Incorrect"}
                    </Text>

                    <Text style={styles.timeText}>Time Spent: {answer.timeSpent} sec</Text>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        elevation: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
    },
    icon: {
        fontSize: 48,
        marginVertical: 8,
    },
    resultText: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: "100%",
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
});
