import { sessionApi } from "@/services/quiz.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/color";

export default function Index() {
  const router = useRouter();
  const [isMock, setIsMock] = useState(false);

  const handleStartQuiz = async () => {
    try {
      const response = await sessionApi();
      await AsyncStorage.setItem("sessionId", response.sessionId);
    }catch(error) {
      console.error("Error starting quiz:", error);
      return;
    }

    router.replace("/(quiz)/quiz_index");
  };

  const toggleMock = () => {
    setIsMock(!isMock);
  };

  // ดึงค่าจาก storage ตอนเปิดแอป
  useEffect(() => {
    const getMockFromStorage = async () => {
      const value = await AsyncStorage.getItem("isMock");
      if (value !== null) {
        setIsMock(JSON.parse(value));
      }
    };

    getMockFromStorage();
  }, []);

  // บันทึกลง storage ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    const setMockToStorage = async () => {
      await AsyncStorage.setItem("isMock", JSON.stringify(isMock));
    };

    setMockToStorage();
  }, [isMock]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.buttonOutline} onPress={toggleMock}>
          <Text style={styles.buttonOutlineText}>
            {isMock ? "Disable Mock Mode" : "Enable Mock Mode"}
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  buttonGroup: {
    width: "100%",
    maxWidth: 350,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});
