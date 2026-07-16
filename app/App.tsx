import "./global.css";
import React, { useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Epilogue_700Bold,
  Epilogue_800ExtraBold,
} from "@expo-google-fonts/epilogue";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { SplineSans_700Bold } from "@expo-google-fonts/spline-sans";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { AppDataProvider } from "./src/data/AppDataContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

SplashScreen.preventAutoHideAsync().catch(() => {});

function NavThemeWrapper() {
  const { themeName } = useTheme();
  return (
    <NavigationContainer>
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Epilogue_700Bold,
    Epilogue_800ExtraBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    SplineSans_700Bold,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppDataProvider>
            <NavThemeWrapper />
          </AppDataProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </View>
  );
}
