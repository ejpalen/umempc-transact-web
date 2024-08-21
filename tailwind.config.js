/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#2469FF",
        secondary: "#E1F0FE",
        default: "#333",
        hoverBg: "#f8f8f8",
      },
    },
  },
  plugins: [],
};
