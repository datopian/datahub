const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: false,
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
