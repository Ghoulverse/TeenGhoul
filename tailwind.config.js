/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        'ghoul-bg': '#f8f9fa',
        'ghoul-card': 'rgba(248, 249, 250, 0.9)',
        'ghoul-cyan': '#c4b5fd',
        'ghoul-purple': '#9ca3af',
        'ghoul-accent': '#ddd6fe',
        'ghoul-text': '#374151',
        'ghoul-muted': '#9ca3af',
        'ghoul-gold': '#c4b5fd',
      },
      fontFamily: {
      josefin: ['Josefin Sans', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      teen: ['Space Grotesk', 'sans-serif'],
    },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'glow': '0 0 20px rgba(196, 181, 253, 0.3), 0 0 40px rgba(221, 214, 254, 0.15)',
        'glow-intense': '0 0 30px rgba(196, 181, 253, 0.5), 0 0 60px rgba(221, 214, 254, 0.3)',
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "ghost-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "ghost-sway": {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(196,181,253,0.2))" },
          "50%": { filter: "drop-shadow(0 0 16px rgba(196,181,253,0.35))" },
        },
        "glow-intense": {
          "0%, 100%": { filter: "drop-shadow(0 0 16px rgba(196,181,253,0.35))" },
          "50%": { filter: "drop-shadow(0 0 28px rgba(196,181,253,0.5))" },
        },
        "pulse-hint": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(2px)" },
        },
        "screen-shake": {
          "0%, 100%": { transform: "translate(0)" },
          "10%": { transform: "translate(-4px, -2px)" },
          "20%": { transform: "translate(4px, 2px)" },
          "30%": { transform: "translate(-3px, 1px)" },
          "40%": { transform: "translate(3px, -1px)" },
          "50%": { transform: "translate(-2px, 2px)" },
          "60%": { transform: "translate(2px, -2px)" },
          "70%": { transform: "translate(-1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
          "90%": { transform: "translate(-0.5px, 0.5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "ghost-bob": "ghost-bob 4s ease-in-out infinite",
        "ghost-sway": "ghost-sway 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "glow-intense": "glow-intense 2s ease-in-out infinite",
        "pulse-hint": "pulse-hint 3s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 0.6s ease-in-out infinite",
        "screen-shake": "screen-shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

