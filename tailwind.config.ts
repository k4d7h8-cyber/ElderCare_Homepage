import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A7CF7",
        primaryDark: "#2E5FD9",
        banner: "#F5EFE6",
        surface: "#F5F7FA",
        card: "#FFFFFF",
        textMain: "#1A1A2E",
        textSub: "#6B7280",
        ctaLeft: "#4A7CF7",
        ctaRight: "#1E2E4F",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
