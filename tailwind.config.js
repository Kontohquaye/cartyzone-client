/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202732",
        secondary: "#E83A3A",
        accent: "#959595",
      },
    },
  },
  plugins: [],
};
