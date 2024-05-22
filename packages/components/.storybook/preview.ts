import 'tailwindcss/tailwind.css'
import '../src/index.css'
import type { Preview } from '@storybook/react';

window.process = {
 ...window.process,
 env:{
  ...window.process?.env
 }
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
