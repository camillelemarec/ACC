import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1E3D",
        accent: "#C5A059",
        offwhite: "#F9F9F9"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-serif)", "serif"]
      },
      letterSpacing: {
        wideTitle: "0.08em"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;

