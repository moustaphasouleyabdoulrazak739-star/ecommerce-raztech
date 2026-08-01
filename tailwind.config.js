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
        yamba: {
          blue: "#2C6E8E",
          "blue-dark": "#1E4F66",
          "blue-light": "#4A93B5",
          dark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
}