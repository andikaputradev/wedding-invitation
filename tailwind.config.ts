import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: "#D4AF37",
          soft: "#F5D76E",
          deep: "#B8860B",
          champagne: "#F7E7CE",
        },
        ivory: "#FFF8E7",
        beige: {
          warm: "#E8D8B8",
        },
        brown: {
          soft: "#6B4F2A",
          deep: "#2A1E12",
        },
        charcoal: "#15130F",
        "soft-black": "#0B0A08",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D4AF37 0%, #F5D76E 50%, #B8860B 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, #F5D76E 50%, transparent 100%)",
        "dark-luxury":
          "linear-gradient(135deg, #0B0A08 0%, #15130F 50%, #1a1712 100%)",
        "light-luxury":
          "linear-gradient(135deg, #FFF8E7 0%, #F7E7CE 50%, #E8D8B8 100%)",
      },
      boxShadow: {
        "gold-soft": "0 4px 24px rgba(212, 175, 55, 0.15)",
        "gold-glow": "0 0 32px rgba(212, 175, 55, 0.25)",
        "dark-luxury": "0 8px 32px rgba(0, 0, 0, 0.6)",
        "card-light": "0 2px 16px rgba(212, 175, 55, 0.1)",
        "card-dark": "0 2px 16px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        shimmer: "shimmer 2.5s infinite linear",
        "float-up": "floatUp 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.6" },
          "50%": { transform: "translateY(-20px)", opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(212, 175, 55, 0.15)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
