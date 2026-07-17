import React from "react";
import { Pressable, PressableProps, Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

type IconName = keyof typeof MaterialIcons.glyphMap;

interface ScribbleButtonProps extends Omit<PressableProps, "style"> {
  label?: string;
  icon?: IconName;
  bg?: string;
  color?: string;
  rotate?: number;
  shadowOffset?: number;
  circle?: boolean;
  size?: number; // used when icon-only
  style?: ViewStyle;
}

const WONKY_RADIUS: ViewStyle = {
  borderTopLeftRadius: 8,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 6,
};

const SPRING = { damping: 15, stiffness: 260, mass: 0.5 } as const;

/**
 * The signature "wonky-btn": a hard ink offset shadow that the button
 * physically presses into. The press is driven by Reanimated on the UI
 * thread for a smooth, springy, tactile feel.
 */
export function ScribbleButton({
  label,
  icon,
  bg,
  color,
  rotate = 0,
  shadowOffset = 4,
  circle = false,
  size = 48,
  style,
  onPressIn,
  onPressOut,
  ...rest
}: ScribbleButtonProps) {
  const { theme } = useTheme();
  const press = useSharedValue(0);

  const background = bg ?? theme.primary;
  const textColor = color ?? theme.onSurface;
  const radius: ViewStyle = circle ? { borderRadius: 9999 } : WONKY_RADIUS;

  const contentAnim = useAnimatedStyle(() => ({
    transform: [
      { translateX: press.value * shadowOffset },
      { translateY: press.value * shadowOffset },
      { scale: 1 - press.value * 0.04 },
    ],
  }));

  return (
    <Pressable
      {...rest}
      onPressIn={(e) => {
        press.value = withTiming(1, { duration: 70 });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        press.value = withSpring(0, SPRING);
        onPressOut?.(e);
      }}
      style={[{ transform: [{ rotate: `${rotate}deg` }] }, style]}
    >
      <View>
        {/* Hard offset shadow layer sitting behind the content. */}
        <View
          style={[
            radius,
            {
              position: "absolute",
              top: shadowOffset,
              left: shadowOffset,
              width: "100%",
              height: "100%",
              backgroundColor: theme.shadow,
            },
          ]}
        />
        {/* Foreground content that presses down into the shadow. */}
        <Animated.View
          style={[
            radius,
            {
              backgroundColor: background,
              borderColor: theme.line,
              borderWidth: 4,
              paddingVertical: label ? 12 : 0,
              paddingHorizontal: label ? 20 : 0,
              width: label ? undefined : size,
              height: label ? undefined : size,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
            },
            contentAnim,
          ]}
        >
          {icon && (
            <MaterialIcons
              name={icon}
              size={label ? 20 : size * 0.5}
              color={textColor}
            />
          )}
          {label && (
            <Text
              style={{
                fontFamily: "Epilogue_700Bold",
                fontSize: 16,
                color: textColor,
              }}
            >
              {label}
            </Text>
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
}
