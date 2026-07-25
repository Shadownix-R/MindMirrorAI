/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'soft-blue': {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#A7D8F0', // Primary
          400: '#7CD4FD',
          500: '#38BDF8',
          600: '#0284C7',
          700: '#0369A1',
        },
        'sage': {
          50: '#F4F7F4',
          100: '#E5EBE5',
          200: '#C9D7C9',
          300: '#9DBA9E', // Primary
          400: '#7C9E7E',
          500: '#5C7E5F',
          600: '#435D46',
        },
        'lavender': {
          50: '#F7F6FD',
          100: '#E8E5F8', // Primary
          200: '#D5CEF3',
          300: '#B8ABEA',
          400: '#957FE0',
          500: '#7856D4',
        },
        'calm-slate': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          800: '#1E293B',
          900: '#0F172A',
          950: '#0B0F19',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob-slow': 'blob 10s infinite alternate ease-in-out',
        'blob-delayed': 'blob 12s infinite alternate-reverse ease-in-out 3s',
        'float': 'float 6s infinite ease-in-out',
        'pulse-subtle': 'pulseSubtle 4s infinite ease-in-out',
        'breathe': 'breathe 8s infinite ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(0.85)', opacity: '0.7' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
