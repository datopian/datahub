module.exports = {
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
