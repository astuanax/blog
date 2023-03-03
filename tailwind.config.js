/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./_site/**/*.{html,js}',],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        body: "#f5f5f5",
        txt: "#4B4145",
        primary: '#F7981E',
        secondary: '#48233C',
        info: '#005FFE',
        cyan: '#17a2b8',
        gray: {
          100: '#f8f9fa',
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#4B4145",
          800: "#343a40",
          900: "#27111B",
        }

      },
      backgroundImage: {
        'footer': "url('/img/wasp-cloud.png')",
      },
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        body: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },

    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
