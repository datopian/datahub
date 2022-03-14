const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.ts",
    "./components/**/*.jsx",
    "./components/**/*.tsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        mono: ["Inconsolata", ...defaultTheme.fontFamily.mono]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
