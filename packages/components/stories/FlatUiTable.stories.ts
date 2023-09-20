import type { Meta, StoryObj } from '@storybook/react';

import { FlatUiTable, FlatUiTableProps } from '../src/components/FlatUiTable';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/FlatUiTable',
  component: FlatUiTable,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Data to be displayed in the table, must be setup as an array of key value pairs',
    },
    csv: {
      description: 'CSV data as string.',
    },
    url: {
      description:
        'Fetch the data from a CSV file remotely. only the first 5MB of data will be displayed',
    },
    bytes: {
      description:
        'Fetch the data from a CSV file remotely. only the first <bytes> of data will be displayed',
    },
    parsingConfig: {
      description:
        'Configuration for parsing the CSV data. See https://www.papaparse.com/docs#config for more details',
    },
  },
};

export default meta;

type Story = StoryObj<FlatUiTableProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FromColumnsAndData: Story = {
  name: 'Table data',
  args: {
    data: [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ],
  },
};

export const FromRawCSV: Story = {
  name: 'Table from raw CSV',
  args: {
    rawCsv: `
    Year,Temp Anomaly
    1850,-0.418
    2020,0.923
    `,
  },
};

export const FromURL: Story = {
  name: 'Table from URL',
  args: {
    url: 'https://ckan-dev.sse.datopian.com/datastore/dump/601c9cf0-595e-46d8-88fc-d1ab2904e2db',
  },
};
