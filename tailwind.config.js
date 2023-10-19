/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 100: "#202732A9", 200: "#202732" },
        secondary: "#E83A3A",
        img: "#EBEBEB",
        accent: "#959595",
        rating: "#FFA41C",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
