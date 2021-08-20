const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.js',
    './pages/**/*.ts',
    './pages/**/*.jsx',
    './pages/**/*.tsx',
    './components/**/*.js',
    './components/**/*.ts',
    './components/**/*.jsx',
    './components/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
