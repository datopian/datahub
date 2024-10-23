import type { Meta, StoryObj } from '@storybook/react';

import { LineChart, LineChartProps } from '../src/components/LineChart';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Data to be displayed. \n\n \
Must be an object with one of the following properties: `url` or `values` \n\n \
`url`: URL pointing to a CSV file. \n\n \
`values`: array of objects \n\n',
    },
    title: {
      description: 'Title to display on the chart.',
    },
    xAxis: {
      description:
        'Name of the column header or object property that represents the X-axis on the data.',
    },
    xAxisType: {
      description: 'Type of the X-axis.',
    },
    xAxisTimeUnit: {
      description: 'Time unit of the X-axis, in case its type is `temporal.`',
    },
    yAxis: {
      description:
        'Name of the column headers or object properties that represent the Y-axis on the data.',
    },
    yAxisType: {
      description: 'Type of the Y-axis',
    },
    symbol: {
      description: 'Name of the column header or object property that represents a series for multiple series.',
    }
  },
};

export default meta;

type Story = StoryObj<LineChartProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FromDataPoints: Story = {
  name: 'Line chart from array of data points',
  args: {
    data: {
      values: [
        { year: '1850', value: -0.41765878 },
        { year: '1851', value: -0.2333498 },
        { year: '1852', value: -0.22939907 },
        { year: '1853', value: -0.27035445 },
        { year: '1854', value: -0.29163003 },
      ],
    },
    xAxis: 'year',
    yAxis: 'value',
  },
};

export const MultiSeries: Story = {
  name: 'Line chart with multiple series (specifying symbol)',
  args: {
    data: {
      values: [
        { year: '1850', value: -0.41765878, z: 'A' },
        { year: '1851', value: -0.2333498, z: 'A' },
        { year: '1852', value: -0.22939907, z: 'A' },
        { year: '1853', value: -0.27035445, z: 'A' },
        { year: '1854', value: -0.29163003, z: 'A' },
        { year: '1850', value: -0.42993882, z: 'B' },
        { year: '1851', value: -0.30365549, z: 'B' },
        { year: '1852', value: -0.27905189, z: 'B' },
        { year: '1853', value: -0.22939704, z: 'B' },
        { year: '1854', value: -0.25688013, z: 'B' },
        { year: '1850', value: -0.4757164, z: 'C' },
        { year: '1851', value: -0.41971018, z: 'C' },
        { year: '1852', value: -0.40724799, z: 'C' },
        { year: '1853', value: -0.45049156, z: 'C' },
        { year: '1854', value: -0.41896583, z: 'C' },
      ],
    },
    xAxis: 'year',
    yAxis: 'value',
    symbol: 'z',
  },
};


export const MultiColumns: Story = {
  name: 'Line chart with multiple series (with multiple columns)',
  args: {
    data: {
      values: [
        { year: '1850', A: -0.41765878, B: -0.42993882, C: -0.4757164 },
        { year: '1851', A: -0.2333498, B: -0.30365549, C: -0.41971018 },
        { year: '1852', A: -0.22939907, B: -0.27905189, C: -0.40724799 },
        { year: '1853', A: -0.27035445, B: -0.22939704, C: -0.45049156 },
        { year: '1854', A: -0.29163003, B: -0.25688013, C: -0.41896583 },
      ],
    },
    xAxis: 'year',
    yAxis: ['A', 'B', 'C']
  },
};

export const FromURL: Story = {
  name: 'Line chart from URL',
  args: {
    data: {
      url: 'https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv',
    },
    title: 'Oil Price x Year',
    xAxis: 'Date',
    yAxis: 'Price',
  },
};
