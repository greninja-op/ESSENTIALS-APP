/** @type {import('tailwindcss').Config} */
// Design tokens derived from the Stitch "Comic Scribble" design system
// (project: Vibrant Scribble Calendar). Hand-drawn brutalism + pop-art:
// thick ink borders, hard offset shadows, candy palette.
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#050505", // outlines, text, hard shadows
        surface: "#fcf8f8",
        "surface-container": "#f1edec",
        "surface-container-high": "#ebe7e7",
        "surface-dim": "#dcd9d9",
        // Cartoon candy accents
        primary: "#ff71ce", // bubblegum pink
        secondary: "#01cdfe", // sky blue
        tertiary: "#fff500", // sunny yellow
        mint: "#05ffa1", // light mint
        error: "#ba1a1a",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#54414b",
        outline: "#87717c",
        // Dark theme surfaces
        "dark-surface": "#131318",
        "dark-surface-container": "#1f1f25",
        "dark-on-surface": "#e4e1e9",
      },
      fontFamily: {
        display: ["Epilogue_800ExtraBold"],
        heading: ["Epilogue_700Bold"],
        body: ["PlusJakartaSans_400Regular"],
        "body-medium": ["PlusJakartaSans_500Medium"],
        label: ["SplineSans_700Bold"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "52px", letterSpacing: "-1px" }],
        "headline-md": ["32px", { lineHeight: "38px" }],
        "body-lg": ["18px", { lineHeight: "29px" }],
        "body-md": ["16px", { lineHeight: "24px" }],
        "label-bold": ["14px", { lineHeight: "17px" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      borderWidth: {
        3: "3px",
        5: "5px",
      },
      spacing: {
        gutter: "20px",
        margin: "24px",
      },
    },
  },
  plugins: [],
};
