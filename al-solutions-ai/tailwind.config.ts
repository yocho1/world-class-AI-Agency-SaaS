import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#09090E",
        "bg-surface": "#111119",
        "bg-elevated": "#1C1C2A",
        "bg-overlay": "#252535",
        "border-subtle": "#2A2A3D",
        "border-default": "#3D3D56",
        "border-strong": "#6C63FF40",
        "primary-50": "#F0EFFE",
        "primary-100": "#D6D3FD",
        "primary-400": "#9D95FF",
        "primary-600": "#6C63FF",
        "primary-700": "#5A51E8",
        "primary-900": "#2D2880",
        "accent-400": "#00E5C4",
        "accent-600": "#00B89D",
        success: "#00E5C4",
        warning: "#FFB547",
        error: "#FF5A5A",
        info: "#6C63FF",
        "text-primary": "#F8F8FF",
        "text-secondary": "#9898B0",
        "text-tertiary": "#5A5A72",
        "text-disabled": "#3D3D56",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
