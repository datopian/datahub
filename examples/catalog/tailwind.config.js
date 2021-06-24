module.exports = {
  // 2021-06-24 trying out fix for tailwind production that worked for main site
  // see https://github.com/datopian/portal.js/issues/571
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  purge: [
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.ts",
    "./components/**/*.jsx",
    "./components/**/*.tsx"
  ],
  mode: 'jit',
  theme: {
    fontSize: {
      tiny: 'var(--font-size-small)',
      md: 'var(--font-size-medium)',
      lg: 'var(--font-size-large)',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        negative: 'var(--color-negative)',
        positive: 'var(--color-positive)',
        'primary-background': 'var(--background-primary)',
        'sec-background': 'var(--background-sec)',
        'primary-text': 'var(--color-text-primary)',
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  variants: {
    backgroundColor: ['active'],
  },
  plugins: ['font-size'],
  corePlugins: {
    fontSize: true,
  },
};
