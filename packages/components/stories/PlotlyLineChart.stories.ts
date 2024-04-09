import type { Meta, StoryObj } from '@storybook/react';

import {
  PlotlyLineChart,
  PlotlyLineChartProps,
} from '../src/components/PlotlyLineChart';

const meta: Meta = {
  title: 'Components/Charts/PlotlyLineChart',
  component: PlotlyLineChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Data to be displayed. \n\n \
Must be an object with one of the following properties: `url`, `values` or `csv` \n\n \
`url`: URL pointing to a CSV file. \n\n \
`values`: array of objects. \n\n \
`csv`: string with valid CSV. \n\n \
',
    },
    bytes: {
      // TODO: likely this should be an extra option on the data parameter,
      // specific to URLs
      description:
        "How many bytes to read from the url so that the entire file doesn's have to be fetched.",
    },
    parsingConfig: {
      description:
        'If using URL or CSV, this parsing config will be used to parse the data. Check https://www.papaparse.com/ for more info',
    },
    title: {
      description: 'Title to display on the chart.',
    },
    lineLabel: {
      description:
        'Label to display on the line, will use yAxis if not provided',
    },
    xAxis: {
      description:
        'Name of the column header or object property that represents the X-axis on the data.',
    },
    yAxis: {
      description:
        'Name of the column header or object property that represents the Y-axis on the data.',
    },
    uniqueId: {
      description:
        'Provide a unique ID to help with cache revalidation of the fetched data.',
    },
  },
};

export default meta;

type Story = StoryObj<PlotlyLineChartProps>;

export const FromDataPoints: Story = {
  name: 'Line chart from array of data points',
  args: {
    data: {
      values: [
        { year: '1850', temperature: -0.41765878 },
        { year: '1851', temperature: -0.2333498 },
        { year: '1852', temperature: -0.22939907 },
        { year: '1853', temperature: -0.27035445 },
        { year: '1854', temperature: -0.29163003 },
      ],
    },
    xAxis: 'year',
    yAxis: 'temperature',
  },
};

export const FromURL: Story = {
  name: 'Line chart from URL',
  args: {
    title: 'Oil Price x Year',
    data: {
      url: 'https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv',
    },
    xAxis: 'Date',
    yAxis: 'Price',
  },
};

export const FromInlineCSV: Story = {
  name: 'Bar chart from inline CSV',
  args: {
    title: 'Apple Stock Prices',
    data: {
      csv: `Date,AAPL.Open,AAPL.High,AAPL.Low,AAPL.Close,AAPL.Volume,AAPL.Adjusted,dn,mavg,up,direction
2015-02-17,127.489998,128.880005,126.919998,127.830002,63152400,122.905254,106.7410523,117.9276669,129.1142814,Increasing
2015-02-18,127.629997,128.779999,127.449997,128.720001,44891700,123.760965,107.842423,118.9403335,130.0382439,Increasing
2015-02-19,128.479996,129.029999,128.330002,128.449997,37362400,123.501363,108.8942449,119.8891668,130.8840887,Decreasing
2015-02-20,128.619995,129.5,128.050003,129.5,48948400,124.510914,109.7854494,120.7635001,131.7415509,Increasing`,
    },
    xAxis: 'Date',
    yAxis: 'AAPL.Open',
  },
};
