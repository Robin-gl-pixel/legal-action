import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF9",
        foreground: "#0F0E2E",
        border: "#E5E5E0",
        primary: {
          DEFAULT: "#FFD23F",
          foreground: "#1E1B4B",
        },
        accent: {
          DEFAULT: "#1E1B4B",
          foreground: "#FAFAF9",
        },
        muted: {
          DEFAULT: "#F4F4F2",
          foreground: "#6B6A88",
        },
        success: "#10B981",
      },
      fontFamily: {
        sans: [
          '"General Sans"',
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
