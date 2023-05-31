/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    fontFamily: {
      'inter': 'Inter',
    },
    extend: {
      colors: {
        'aero': '#42BFDD',
        'anti-flash-white': '#F0F6F6',
        'mint-green': '#BBE6E4',
        'indigo-blue': '#084B83',
        'back-theme': '#f4fbfd',
        'card-theme': '#d9f2f8',
        'dark-border': '#156579',
        'active-theme': '#156579',
        'header-theme': '#1a7a92',
      },
    },
  },
  plugins: [],
}
