const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/ui/**/*.svelte'],
  theme: {
    extend: {},
    colors: {
      primary: colors.zinc,
      secondary: colors.white,
      neutral: colors.gray,
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
    },
  },
  plugins: [],
};
