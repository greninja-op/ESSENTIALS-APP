import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "../theme/ThemeContext";

const ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Month: "calendar-month",
  Day: "view-day",
  Notes: "sticky-note-2",
  Alerts: "notifications",
};

const ROTATIONS: Record<string, number> = {
  Month: 2,
  Day: -2,
  Notes: 1,
  Alerts: -1,
};

export function ScribbleTabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.card,
        borderTopWidth: 4,
        borderColor: theme.line,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
        paddingHorizontal: 12,
        boxShadow: `0px -4px 0px ${theme.shadow}`,
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              paddingVertical: 6,
              borderRadius: 12,
              borderWidth: focused ? 3 : 0,
              borderColor: theme.line,
              backgroundColor: focused ? theme.secondary : "transparent",
              // Avoid `transform: undefined` (Fabric coerces it to null and
              // crashes processTransform). Always provide a rotate array.
              transform: [{ rotate: focused ? `${ROTATIONS[route.name]}deg` : "0deg" }],
              boxShadow: focused ? `2px 2px 0px ${theme.shadow}` : "0px 0px 0px transparent",
            }}
          >
            <MaterialIcons
              name={ICONS[route.name] ?? "circle"}
              size={24}
              color={focused ? theme.line : theme.onSurfaceVariant}
            />
            <Text
              style={{
                fontFamily: "Epilogue_700Bold",
                fontSize: 11,
                marginTop: 2,
                color: focused ? theme.line : theme.onSurfaceVariant,
              }}
            >
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
