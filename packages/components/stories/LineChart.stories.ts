import type { Meta, StoryObj } from '@storybook/react';

import { LineChart, LineChartProps } from '../src/components/LineChart';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Data to be displayed.\n\n E.g.: [["1990", 1], ["1991", 2]] \n\nOR\n\n "https://url.to/data.csv"',
    },
    title: {
      description: 'Title to display on the chart. Optional.',
    },
    xAxis: {
      description:
        'Name of the X axis on the data. Required when the "data" parameter is an URL.',
    },
    xAxisType: {
      description: 'Type of the X axis',
    },
    xAxisTimeUnit: {
      description: 'Time unit of the X axis (optional)',
    },
    yAxis: {
      description:
        'Name of the Y axis on the data. Required when the "data" parameter is an URL.',
    },
    yAxisType: {
      description: 'Type of the Y axis',
    },
    fullWidth: {
      description:
        'Whether the component should be rendered as full bleed or not',
    },
  },
};

export default meta;

type Story = StoryObj<LineChartProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FromDataPoints: Story = {
  name: 'Line chart from array of data points',
  args: {
    data: [
      ['1850', -0.41765878],
      ['1851', -0.2333498],
      ['1852', -0.22939907],
      ['1853', -0.27035445],
      ['1854', -0.29163003],
    ],
  },
};

export const FromURL: Story = {
  name: 'Line chart from URL',
  args: {
    title: 'Oil Price x Year',
    data: 'https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv',
    xAxis: 'Date',
    yAxis: 'Price',
  },
};
