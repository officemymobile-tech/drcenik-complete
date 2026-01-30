import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Logo-inspired color palette
        'navy': {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#b3c5d9',
          300: '#8da8c6',
          400: '#678bb3',
          500: '#2c3e50',  // Primary navy from logo
          600: '#1a3a3a',  // Deep teal
          700: '#0f2a2a',
          800: '#081818',
          900: '#040c0c',
        },
        'gold': {
          50: '#fef9f0',
          100: '#fdf2e0',
          200: '#fae5c1',
          300: '#f7d8a2',
          400: '#f4cb83',
          500: '#c9a961',  // Primary gold from logo
          600: '#a68a4d',
          700: '#836b39',
          800: '#604c25',
          900: '#3d2d11',
        },
        'teal': {
          50: '#f0f9f8',
          100: '#d9f0ed',
          200: '#b3e1db',
          300: '#8dd2c9',
          400: '#67c3b7',
          500: '#1a3a3a',  // Deep teal
          600: '#0f2a2a',
          700: '#081818',
          800: '#040c0c',
          900: '#020606',
        },
      },
      backgroundImage: {
        'gradient-navy-teal': 'linear-gradient(135deg, #1a3a3a 0%, #0f2a2a 100%)',
        'gradient-navy-gold': 'linear-gradient(135deg, #2c3e50 0%, #c9a961 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f2a2a 0%, #081818 100%)',
      },
      backdropBlur: {
        'glass': '10px',
        'glass-lg': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
        'glow': '0 0 20px rgba(201, 169, 97, 0.3)',
        'glow-lg': '0 0 40px rgba(201, 169, 97, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 97, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 97, 0.6)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
