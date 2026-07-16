import React from "react";
import { Pressable, PressableProps, Text, View, ViewStyle } from "react-native";
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

/**
 * The signature "wonky-btn": thick ink border + hard offset shadow that
 * collapses as the button is pressed (translate + shrink), mimicking a
 * physical press.
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
  ...rest
}: ScribbleButtonProps) {
  const { theme } = useTheme();
  const background = bg ?? theme.primary;
  const textColor = color ?? theme.onSurface;

  return (
    <Pressable {...rest}>
      {({ pressed }) => {
        const shift = pressed ? shadowOffset : 0;
        const currentShadow = pressed ? 0 : shadowOffset;
        return (
          <View
            style={[
              circle ? { borderRadius: 9999 } : WONKY_RADIUS,
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
                transform: [
                  { rotate: `${rotate}deg` },
                  { translateX: shift },
                  { translateY: shift },
                ],
                boxShadow: `${currentShadow}px ${currentShadow}px 0px ${theme.shadow}`,
              },
              style,
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
          </View>
        );
      }}
    </Pressable>
  );
}
