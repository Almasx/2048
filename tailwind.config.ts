import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#4A54EB",
        dark: {
          DEFAULT: "#020202",
          secondary: "#090909",
          tertiary: "#0f0f0f",
        },
        light: {
          DEFAULT: "#ffffff",
        },
        gray: {
          dark: {
            DEFAULT: "#1a1b1a",
            secondary: "#1C1C1C",
          },
          light: {
            DEFAULT: "#D4D4D4",
            secondary: "#e5e5e5",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
