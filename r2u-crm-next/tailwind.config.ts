import type { Config } from "tailwindcss";

// Design tokens for R2U CRM — an overseas-education consultancy platform.
// Palette is built around "flight path" navy/sky tones (the subject: study-abroad
// journeys) rather than a generic SaaS purple, with a warm amber accent reserved
// for CAS/offer milestones — the moments that actually matter to a student's file.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand — deep aviation navy, used for primary actions & nav
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#82abff",
          400: "#4f83f7",
          500: "#2c60e0",
          600: "#1f47b8",
          700: "#1a3990",
          800: "#152c6e",
          900: "#0f1f4d",
          950: "#0a1533"
        },
        // Milestone accent — used ONLY for offer/CAS/visa success states
        milestone: {
          400: "#f5b656",
          500: "#e89c2e",
          600: "#c47f1d"
        },
        surface: {
          light: "#f7f8fb",
          card: "#ffffff",
          dark: "#0d1220",
          "dark-card": "#141a2b"
        },
        status: {
          success: "#1f9d55",
          warning: "#e8a52e",
          danger: "#d64545",
          info: "#2c60e0",
          neutral: "#8993a8"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 31, 77, 0.04), 0 4px 16px rgba(15, 31, 77, 0.06)",
        "card-dark": "0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.35)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        "fade-in": "fade-in 0.25s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
