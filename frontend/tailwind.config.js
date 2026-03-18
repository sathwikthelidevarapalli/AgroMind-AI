/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#14532d",
        secondary: "#16a34a",
        accent: "#facc15",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        surface: "#ffffff",
        base: "#f1f5f9",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 32px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(22, 163, 74, 0.28)" },
          "70%": { boxShadow: "0 0 0 14px rgba(22, 163, 74, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(22, 163, 74, 0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease forwards",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
