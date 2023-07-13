console.log('PostCSS');

export default {
  plugins: {
    'postcss-import': {},
    'postcss-url': { url: 'inline' },
    tailwindcss: {},
    autoprefixer: {},
  },
};
