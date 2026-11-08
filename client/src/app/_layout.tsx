import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

export default RootLayout;
