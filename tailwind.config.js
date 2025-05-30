/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae0ff',
          300: '#7cc7ff',
          400: '#36a9ff',
          500: '#0c8fff',
          600: '#0072ff',
          700: '#005cdb',
          800: '#0049b3',
          900: '#003c8f',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#dcd1ff',
          300: '#c3adff',
          400: '#a67dff',
          500: '#8a4dff',
          600: '#7c2dff',
          700: '#6d1ed6',
          800: '#5a1aad',
          900: '#4a178c',
        },
        accent: {
          50: '#fff1f3',
          100: '#ffe4e8',
          200: '#ffccd5',
          300: '#ffa3b5',
          400: '#ff6b8c',
          500: '#ff3366',
          600: '#ff1447',
          700: '#db0c3a',
          800: '#b30d33',
          900: '#8f0f2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(0, 114, 255, 0.1), 0 0 6px -2px rgba(0, 114, 255, 0.05)',
      },
    },
  },
  plugins: [],
}