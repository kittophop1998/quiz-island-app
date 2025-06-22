import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants/color";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack screenOptions={{
        headerShown: true,
        headerTitle: "Quiz Island",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTitleStyle: { color: COLORS.white, fontSize: 24, fontWeight: "bold" },
      }} />
    </SafeAreaView>
  );
}
