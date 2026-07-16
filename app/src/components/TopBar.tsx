import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

interface TopBarProps {
  title: string;
  onMenu?: () => void;
  onAvatar?: () => void;
  leadingIcon?: keyof typeof MaterialIcons.glyphMap;
}

export function TopBar({
  title,
  onMenu,
  onAvatar,
  leadingIcon = "menu",
}: TopBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.card,
        borderBottomWidth: 4,
        borderColor: theme.line,
        paddingHorizontal: 20,
        paddingVertical: 14,
        boxShadow: `0px 4px 0px ${theme.shadow}`,
      }}
    >
      <Pressable
        onPress={onMenu}
        hitSlop={10}
        style={{
          padding: 6,
          borderRadius: 9999,
          borderWidth: 2,
          borderColor: "transparent",
        }}
      >
        <MaterialIcons name={leadingIcon} size={30} color={theme.primary} />
      </Pressable>

      <Text
        style={{
          fontFamily: "Epilogue_800ExtraBold",
          fontSize: 22,
          textTransform: "uppercase",
          letterSpacing: -0.5,
          color: theme.onSurface,
          transform: [{ rotate: "-2deg" }],
        }}
      >
        {title}
      </Text>

      <Pressable onPress={onAvatar} hitSlop={10}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 9999,
            borderWidth: 3,
            borderColor: theme.line,
            backgroundColor: theme.primaryFixed,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ rotate: "3deg" }],
            boxShadow: `2px 2px 0px ${theme.shadow}`,
          }}
        >
          <MaterialIcons name="face" size={26} color={theme.onSurface} />
        </View>
      </Pressable>
    </View>
  );
}
