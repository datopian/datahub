import type { Meta, StoryObj } from '@storybook/react';

import { Vega } from '../src/components/Vega';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Charts/Vega',
  component: Vega,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        "Vega's `data` prop. You can find references on how to use this prop at https://vega.github.io/vega/docs/data/",
    },
    spec: {
      description:
        "Vega's `spec` prop. You can find references on how to use this prop at https://vega.github.io/vega/docs/specification/",
    },
  },
};

export default meta;

type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  name: 'Bar chart',
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
