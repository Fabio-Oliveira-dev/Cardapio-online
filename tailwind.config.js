/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      bacgroundImage:{
        "home": "url(assets/img/bg.png)"
      }
    },
  },
  plugins: [],
}