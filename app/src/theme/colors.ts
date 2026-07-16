// Palette from the Stitch "Comic Scribble" design system.
// Cartoon-candy accents over light/dark neutral surfaces with ink-black linework.

export const palette = {
  ink: "#050505",
  white: "#ffffff",

  // Candy accents (shared across themes)
  pink: "#ff71ce",
  pinkFixed: "#ffd8eb",
  cyan: "#01cdfe",
  cyanFixed: "#b9eaff",
  yellow: "#fff500",
  mint: "#05ffa1",
  error: "#ba1a1a",
};

export type ThemeName = "light" | "dark";

export interface Theme {
  name: ThemeName;
  // Structural
  line: string; // border / linework color
  shadow: string; // hard offset shadow color
  // Surfaces
  background: string;
  surface: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  card: string;
  // Text
  onSurface: string;
  onSurfaceVariant: string;
  // Accents
  primary: string;
  primaryFixed: string;
  secondary: string;
  secondaryFixed: string;
  tertiary: string;
}

export const lightTheme: Theme = {
  name: "light",
  line: palette.ink,
  shadow: palette.ink,
  background: "#fcf8f8",
  surface: "#fcf8f8",
  surfaceContainer: "#f1edec",
  surfaceContainerHigh: "#ebe7e7",
  card: palette.white,
  onSurface: "#1c1b1b",
  onSurfaceVariant: "#54414b",
  primary: palette.pink,
  primaryFixed: palette.pinkFixed,
  secondary: palette.cyan,
  secondaryFixed: palette.cyanFixed,
  tertiary: palette.yellow,
};

export const darkTheme: Theme = {
  name: "dark",
  line: palette.ink,
  shadow: "#000000",
  background: "#131318",
  surface: "#131318",
  surfaceContainer: "#1f1f25",
  surfaceContainerHigh: "#2a292f",
  card: "#1f1f25",
  onSurface: "#e4e1e9",
  onSurfaceVariant: "#c4c5d5",
  primary: palette.pink,
  primaryFixed: "#4a2b40",
  secondary: palette.cyan,
  secondaryFixed: "#0b3a45",
  tertiary: palette.yellow,
};

export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
