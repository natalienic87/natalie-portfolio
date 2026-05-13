/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#101010",
        "coral-red": "#E35038",
        "hot-pink": "#FB5755",
        "dusty-pink": "#FBC1C2",
        "dusty-blue": "#6374E4",
        "light-purple": "#D2D7F5",
        yellow: "#FDB154",
        "olive-green": "#68512F",
        "dark-grey": "#2E2E2E",
        "off-white": "#FEFEFE",
        "body-grey": "#A1989D",
        purple: "#8286F7",
        "off-white-2": "#F6ECE0",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
