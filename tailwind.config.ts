// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#00caff",   // True Blue
          dark: "#333333",   // Jet
          green: "#94e8b4",  // Celadon
          orange: "#ff8810", // UT Orange
          mauve: "#bbadff",  // Mauve
        },
      },
    },
  },
  plugins: [],
};
export default config;
