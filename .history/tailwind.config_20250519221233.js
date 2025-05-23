/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        sm: '640px',
      md: '768px',
      }
    },
    extend: {
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
         
        'glow-primary': 'rgba(56, 189, 248, 0.7)',
        'glow-secondary': 'rgba(94, 234, 212, 0.6)',
        'neon-pink': 'rgba(236, 72, 153, 0.8)',
        'neon-blue': 'rgba(59, 130, 246, 0.8)',
        'neon-green': 'rgba(16, 185, 129, 0.8)',
      
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        gaming: {
          'dark': '#191e26',
          'card': 'rgba(25, 30, 38, 0.75)',
          'purple': '#9b87f5',
          'blue': '#2c6dc4',
          'accent': '#a651cf',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        cinzel: ['var(--font-cinzel)', ...defaultTheme.fontFamily.serif],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'float-blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '20%': { transform: 'translate(30px, 20px) scale(1.05)' },
          '40%': { transform: 'translate(20px, 40px) scale(0.95)' },
          '60%': { transform: 'translate(-20px, 30px) scale(1.1)' },
          '80%': { transform: 'translate(-30px, -20px) scale(0.9)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-blob': 'float-blob 15s infinite ease-in-out',
      },
       boxShadow: {
        'portal-card': '0 0 30px rgba(0, 255, 170, 0.5), 0 0 50px rgba(0, 179, 255, 0.3), inset 0 0 20px rgba(0, 255, 170, 0.2)',
        'portal-card-before': '0 0 20px rgba(0, 255, 170, 1)',
        'portal-button': '0 0 10px rgba(0, 255, 170, 0.5)',
        'portal-button-hover': '0 0 15px rgba(0, 255, 170, 0.7)',
        'portal-card-light': '0 1px 3px 0 rgba(6, 182, 212, 0.2), 0 1px 2px -1px rgba(6, 182, 212, 0.2)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'game-bg': "/games/pac-man.jpeg",
        'cyber-bg': "url('/background.png')",
      },
      transitionTimingFunction: {
        'portal-card': 'cubic-bezier(0.1, 1, 0.1, 1)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.text-shadow-portal-h1': {
          'text-shadow': '0 0 15px rgba(0, 255, 170, 0.7)',
        },
        '.text-shadow-portal-button': {
          'text-shadow': '0 0 5px rgba(0, 255, 255, 0.5)',
        },
        '.text-shadow-portal-button-hover': {
          'text-shadow': '0 0 10px rgba(0, 255, 255, 0.8)',
        },
      })
    }
  ],
};