import React from "react";
import { View } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

interface ScreenProps {
  children: React.ReactNode;
  edges?: readonly Edge[];
}

/** Full-screen themed background wrapper that respects safe areas. */
export function Screen({ children, edges = ["top"] }: ScreenProps) {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      edges={edges}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
