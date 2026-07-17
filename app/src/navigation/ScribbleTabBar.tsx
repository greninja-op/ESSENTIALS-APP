import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "../theme/ThemeContext";
import type { Theme } from "../theme/colors";

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

const SPRING = { damping: 14, stiffness: 220, mass: 0.6 } as const;

function TabItem({
  name,
  focused,
  onPress,
  theme,
}: {
  name: string;
  focused: boolean;
  onPress: () => void;
  theme: Theme;
}) {
  const f = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    f.value = withSpring(focused ? 1 : 0, SPRING);
  }, [focused, f]);

  const anim = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + f.value * 0.12 },
      { translateY: -f.value * 5 },
      { rotate: `${f.value * (ROTATIONS[name] ?? 0)}deg` },
    ],
  }));

  return (
    <Pressable onPress={onPress} hitSlop={8} style={{ width: 72, alignItems: "center" }}>
      <Animated.View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 6,
            paddingHorizontal: 4,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: focused ? theme.line : "transparent",
            backgroundColor: focused ? theme.secondary : "transparent",
            boxShadow: focused
              ? `2px 2px 0px ${theme.shadow}`
              : "0px 0px 0px transparent",
          },
          anim,
        ]}
      >
        <MaterialIcons
          name={ICONS[name] ?? "circle"}
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
          {name}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

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
          <TabItem
            key={route.key}
            name={route.name}
            focused={focused}
            onPress={onPress}
            theme={theme}
          />
        );
      })}
    </View>
  );
}
