import type { Meta, StoryObj } from '@storybook/react';

import { VegaLite } from '../src/components/VegaLite';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Charts/VegaLite',
  component: VegaLite,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Data to be used by Vega Lite. See the Vega Lite docs: https://vega.github.io/vega-lite/docs/data.html.',
    },
    spec: {
      description:
        'Spec to be used by Vega Lite. See the Vega Lite docs: https://vega.github.io/vega-lite/docs/spec.html.',
    },
  },
};

export default meta;

type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  name: 'Chart built with Vega Lite',
  args: {
    data: {
      table: [
        {
          y: -0.418,
          x: 1850,
        },
        {
          y: 0.923,
          x: 2020,
        },
      ],
    },
    spec: {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      mark: 'bar',
      data: {
        name: 'table',
      },
      encoding: {
        x: {
          field: 'x',
          type: 'ordinal',
        },
        y: {
          field: 'y',
          type: 'quantitative',
        },
      },
    },
  },
};
