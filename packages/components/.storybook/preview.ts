import 'tailwindcss/tailwind.css'
import '../src/index.css'
import type { Preview } from '@storybook/react';

window.process = {
 ...window.process,
 env:{
  ...window.process?.env,
  
  NEXT_PUBLIC_MAP_TILE_LAYER_NAME:'MapBox',
  NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_accessToken: 'pk.eyJ1Ijoid2lsbHktcGFsbWFyZWpvIiwiYSI6ImNqNzk5NmRpNDFzb2cyeG9sc2luMHNjajUifQ.lkoVRFSI8hOLH4uJeOzwXw',
  
  
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
