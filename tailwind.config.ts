import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        md: "769px",
        "2xl": "1400px",
      },
    },
    fontFamily: {
      chinese: [
        "Helvetica",
        "Tahoma",
        "Arial",
        "STXihei",
        "华文细黑",
        "Microsoft YaHei",
        "微软雅黑",
        "sans-serif",
      ],
      alex: ["var(--font-alex-brush)"],
      alex_chinese: [
        "var(--font-alex-brush)",
        "Helvetica",
        "Tahoma",
        "Arial",
        "STXihei",
        "华文细黑",
        "Microsoft YaHei",
        "微软雅黑",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        black: "#1d0c26",
        hikari_lavender: "#b2b8b0",
        hikari_lavender_lighter: "#fffaff",
        hikari_gray: "#b2b8b0",
        hikari_gray_deeper: "#829291",
        hikari_blue: "#92c0dd",
        hikari_biege: "#e1cfbb",
        hikari_white: "#cddcea",
        hikari_white_darker: "#8f9aa3",
        hikari_green: "#eedc94",
        hikari_green_darker: "#6d9789",
        hikari_purple: "#f3d1eb",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right": "slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
