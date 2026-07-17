import React from "react";
import { ViewProps, ViewStyle } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { useTheme } from "../theme/ThemeContext";

interface ScribbleCardProps extends ViewProps {
  bg?: string;
  borderColor?: string;
  borderWidth?: number;
  shadowOffset?: number;
  rotate?: number;
  padding?: number;
  /** Position in a list, used to stagger the entrance animation. */
  index?: number;
  /** Disable the entrance animation entirely. */
  animateIn?: boolean;
  /** Override the entering animation. */
  entering?: any;
}

// Approximates the CSS "wonky-border" uneven corner radii.
const WONKY_RADIUS: ViewStyle = {
  borderTopLeftRadius: 4,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 6,
  borderBottomLeftRadius: 10,
};

export function ScribbleCard({
  bg,
  borderColor,
  borderWidth = 3,
  shadowOffset = 4,
  rotate = 0,
  padding = 16,
  index = 0,
  animateIn = true,
  entering,
  style,
  children,
  ...rest
}: ScribbleCardProps) {
  const { theme } = useTheme();

  const enter =
    entering ??
    (animateIn
      ? FadeInDown.springify()
          .damping(16)
          .stiffness(180)
          .mass(0.6)
          .delay(index * 65)
      : undefined);

  return (
    <Animated.View
      {...rest}
      entering={enter}
      exiting={FadeOut.duration(150)}
      style={[
        WONKY_RADIUS,
        {
          backgroundColor: bg ?? theme.card,
          borderColor: borderColor ?? theme.line,
          borderWidth,
          padding,
        },
        rotate ? { transform: [{ rotate: `${rotate}deg` }] } : null,
        shadowOffset > 0
          ? { boxShadow: `${shadowOffset}px ${shadowOffset}px 0px ${theme.shadow}` }
          : null,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
