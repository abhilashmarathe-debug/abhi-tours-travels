/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0A2540",
          yellow: "#F5A623",
          red: "#E03131",
          gold: "#D4AF37",
        },
      },
    },
  },
  plugins: [],
}