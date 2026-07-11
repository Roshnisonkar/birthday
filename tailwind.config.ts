import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        charcoal: "#111111",
        card: "rgba(255,255,255,0.05)",
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#FFD700",
          soft: "rgba(212,175,55,0.25)",
        },
        ivory: "#FFFFFF",
        muted: "#CFCFCF",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        script: ["var(--font-script)"],
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,175,55,0.35)",
        "gold-lg": "0 20px 60px -15px rgba(212,175,55,0.25)",
        "inner-gold": "inset 0 0 30px rgba(212,175,55,0.08)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)",
        "radial-fade": "radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-24px) translateX(8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scaleY(1)" },
          "50%": { opacity: "0.8", transform: "scaleY(0.92)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        twinkle: "twinkle 2.5s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        flicker: "flicker 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
