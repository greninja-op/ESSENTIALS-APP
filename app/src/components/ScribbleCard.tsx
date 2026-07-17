import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface ScribbleCardProps extends ViewProps {
  /** Background color of the card. Defaults to the theme card color. */
  bg?: string;
  /** Border/linework color. Defaults to the theme line color. */
  borderColor?: string;
  /** Border thickness. Design uses 3px for cards. */
  borderWidth?: number;
  /** Hard offset shadow size in px. 0 disables the shadow. */
  shadowOffset?: number;
  /** Rotation in degrees for the hand-drawn feel. */
  rotate?: number;
  padding?: number;
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
  style,
  children,
  ...rest
}: ScribbleCardProps) {
  const { theme } = useTheme();

  return (
    <View
      {...rest}
      style={[
        WONKY_RADIUS,
        {
          backgroundColor: bg ?? theme.card,
          borderColor: borderColor ?? theme.line,
          borderWidth,
          padding,
        },
        // Only include transform/boxShadow keys when set. On Fabric, an
        // explicit `transform: undefined` is coerced to null and crashes
        // processTransform ("Cannot read property 'forEach' of null").
        rotate ? { transform: [{ rotate: `${rotate}deg` }] } : null,
        shadowOffset > 0
          ? { boxShadow: `${shadowOffset}px ${shadowOffset}px 0px ${theme.shadow}` }
          : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
