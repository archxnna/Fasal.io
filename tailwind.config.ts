import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulsate-glow": "pulsate-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-up": "float-up 3s ease-in-out infinite",
      },
      keyframes: {
        "pulsate-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px 10px rgba(34, 197, 94, 0.3)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px 20px rgba(34, 197, 94, 0.1)",
          },
        },
        "float-up": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      backgroundImage: {
        "crop-gradient": "linear-gradient(135deg, #1b4d2d 0%, #2d6a4f 50%, #40916c 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(26, 77, 45, 0.8) 0%, rgba(45, 106, 79, 0.6) 100%)",
      },
      colors: {
        crop: {
          green: "hsl(var(--crop-green))",
          "dark-green": "hsl(var(--crop-dark-green))",
          "light-leaf": "hsl(var(--crop-light-leaf))",
          "soil-brown": "hsl(var(--crop-soil-brown))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
