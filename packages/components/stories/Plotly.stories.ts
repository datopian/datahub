import type { Meta, StoryObj } from '@storybook/react';

import { Plotly } from '../src/components/Plotly';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Charts/Plotly',
  component: Plotly,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  name: 'Chart built with Plotly',
  args: {
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      },
    ],
    layout: {
      title: 'Chart built with Plotly',
      xaxis: {
        title: 'x Axis',
      },
      yaxis: {
        title: 'y Axis',
      },
    },
  },
};
