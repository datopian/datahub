import type { Meta, StoryObj } from '@storybook/react';

import { PlotlyLineChart, PlotlyLineChartProps } from '../src/components/PlotlyLineChart';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Charts/PlotlyLineChart',
  component: PlotlyLineChart,
  tags: ['autodocs'],
  argTypes: {
    url: {
      description:
        'CSV Url to be parsed and used as data source',
    },
    data: {
      description:
        'Data to be displayed. as an array of key value pairs \n\n E.g.: [{ year: 1850, temperature: -0.41765878 }, { year: 1851, temperature: -0.2333498 }, ...]',
    },
    rawCsv: {
      description:
        'Raw csv data to be parsed and used as data source',
    },
    bytes: {
      description:
        'How many bytes to read from the url',
    },
    parsingConfig: {
      description: 'If using url or rawCsv, this parsing config will be used to parse the data. Optional, check https://www.papaparse.com/ for more info',
    },
    title: {
      description: 'Title to display on the chart. Optional.',
    },
    lineLabel: {
      description: 'Label to display on the line, Optional, will use yAxis if not provided',
    },
    xAxis: {
      description:
        'Name of the X axis on the data. Required when the "data" parameter is an URL.',
    },
    yAxis: {
      description:
        'Name of the Y axis on the data. Required when the "data" parameter is an URL.',
    },
  },
};

export default meta;

type Story = StoryObj<PlotlyLineChartProps>;

export const FromDataPoints: Story = {
  name: 'Line chart from array of data points',
  args: {
    data: [
      {year: '1850', temperature: -0.41765878},
      {year: '1851', temperature: -0.2333498},
      {year: '1852', temperature: -0.22939907},
      {year: '1853', temperature: -0.27035445},
      {year: '1854', temperature: -0.29163003},
    ],
    xAxis: 'year',
    yAxis: 'temperature',
  },
};

export const FromURL: Story = {
  name: 'Line chart from URL',
  args: {
    title: 'Oil Price x Year',
    url: 'https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv',
    xAxis: 'Date',
    yAxis: 'Price',
  },
};
