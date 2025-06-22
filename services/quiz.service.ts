import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const sessionApi = async () => {
    try {
        const session = await axios.post(`https://webapi.icydune-a1052ab7.southeastasia.azurecontainerapps.io/api/v1/Quiz/Session`);

        return session.data.data;
    } catch (error) {
        console.error("Error retrieving session:", error);
        return null;
    }
}

export const questionApi = async () => {
    try {
        const value = await AsyncStorage.getItem("sessionId");
        const sessionId = value ?? "mock-session-id";
        const questions = await axios.get(`https://webapi.icydune-a1052ab7.southeastasia.azurecontainerapps.io/api/v1/Quiz/Questions/${sessionId}`);

        return questions.data.data;
    } catch (error) {
        console.error("Error retrieving questions:", error);
        return null;
    }
}

export const answerApi = async (body: any) => {
    try {
        const { data } = await axios.post(`https://webapi.icydune-a1052ab7.southeastasia.azurecontainerapps.io/api/v1/Quiz/Answer`, body);

        return data.data;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    }
}