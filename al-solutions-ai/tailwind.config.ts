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
        brand: {
          DEFAULT: "#5B21F6",
          hover: "#7C3AED",
          light: "#8B5CF6",
          tint: "#EDE9FE",
        },
        success: {
          DEFAULT: "#00D97E",
          tint: "rgba(0, 217, 126, 0.12)",
        },
        dark: {
          bg: "#080812",
          surface: "#0F0F1A",
          card: "#141420",
          border: "#1E1E2E",
        },
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
        "primary-600": "#5A51E8",
        "primary-700": "#4B43D0",
        "primary-900": "#2D2880",
        "accent-400": "#00E5C4",
        "accent-600": "#00B89D",
        successLegacy: "#00E5C4",
        warning: "#FFB547",
        error: "#FF5A5A",
        info: "#6C63FF",
        "text-primary": "#F8F8FF",
        "text-secondary": "#A4A4BE",
        "text-tertiary": "#8F8FA8",
        "text-disabled": "#3D3D56",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "var(--font-mono)", "monospace"],
        display: ["var(--font-jakarta)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        18: "4.5rem",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
        modal: "0 20px 60px rgba(0,0,0,0.18)",
        cta: "0 4px 14px rgba(91, 33, 246, 0.35)",
        "cta-hover": "0 6px 20px rgba(91, 33, 246, 0.5)",
        metric: "0 0 16px rgba(0, 217, 126, 0.15)",
        glow: "0 0 40px rgba(91, 33, 246, 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
