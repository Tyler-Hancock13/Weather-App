/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'aero': '#42BFDD',
        'anti-flash-white': '#F0F6F6',
        'mint-green': '#BBE6E4',
        'indigo-blue': '#084B83',
      },
    },
  },
  plugins: [],
}
