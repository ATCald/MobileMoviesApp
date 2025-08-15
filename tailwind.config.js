
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ], 
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#9B59B6",
        accent: "#E81E63",
        background: "#1A0A2A",
        light: "#F0E6FA",
        dark: "#3E2A54"
      }
    },
  },
  plugins: [],
}

