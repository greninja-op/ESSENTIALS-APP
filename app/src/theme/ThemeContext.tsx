import React, { createContext, useContext, useMemo, useState } from "react";
import { Theme, ThemeName, themes } from "./colors";

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: themes[themeName],
      themeName,
      toggleTheme: () =>
        setThemeName((prev) => (prev === "light" ? "dark" : "light")),
      setThemeName,
    }),
    [themeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
