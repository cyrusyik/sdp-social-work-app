import {
  NotoSansHK_400Regular,
  NotoSansHK_600SemiBold,
  NotoSansHK_700Bold,
  useFonts as useNotoSansHKFonts,
} from "@expo-google-fonts/noto-sans-hk";
import {
  NotoSansMono_400Regular,
  useFonts as useNotoSansMonoFonts,
} from "@expo-google-fonts/noto-sans-mono";


import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  const [hkFontsLoaded, hkFontError] = useNotoSansHKFonts({
    "NotoSansHK-Regular": NotoSansHK_400Regular,
    "NotoSansHK-SemiBold": NotoSansHK_600SemiBold,
    "NotoSansHK-Bold": NotoSansHK_700Bold,
  });
  const [monoFontsLoaded, monoFontError] = useNotoSansMonoFonts({
    "NotoSansMono-Regular": NotoSansMono_400Regular,
  });

  useEffect(() => {
    if (hkFontError) throw hkFontError;
    if (monoFontError) throw monoFontError;
    if (hkFontsLoaded && monoFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [hkFontError, hkFontsLoaded, monoFontError, monoFontsLoaded]);

  if (!hkFontsLoaded || !monoFontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
