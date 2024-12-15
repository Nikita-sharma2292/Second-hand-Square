/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#4B086D',
        lilac: '#ACC0FE',
      },
    },
  },
  plugins: [require("tailwind-scrollbar", "@tailwindcss/forms")],
}