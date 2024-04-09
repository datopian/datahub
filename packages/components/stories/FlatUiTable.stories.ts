import type { Meta, StoryObj } from '@storybook/react';

import { FlatUiTable, FlatUiTableProps } from '../src/components/FlatUiTable';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Tabular/FlatUiTable',
  component: FlatUiTable,
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
      description:
        'Fetch the data from a CSV file remotely. Only the first <bytes> of data will be displayed. Defaults to 5MB.',
    },
    parsingConfig: {
      description:
        'Configuration for parsing the CSV data. See https://www.papaparse.com/docs#config for more details',
    },
    uniqueId: {
      description:
        'Provide a unique ID to help with cache revalidation of the fetched data.',
    },
  },
};

export default meta;

type Story = StoryObj<FlatUiTableProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FromColumnsAndData: Story = {
  name: 'Table from array or objects',
  args: {
    data: {
      values: [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ],
    },
  },
};

export const FromRawCSV: Story = {
  name: 'Table from inline CSV',
  args: {
    data: {
      csv: `
    Year,Temp Anomaly
    1850,-0.418
    2020,0.923
    `,
    },
  },
};

export const FromURL: Story = {
  name: 'Table from URL',
  args: {
    data: {
      url: 'https://storage.openspending.org/alberta-budget/__os_imported__alberta_total.csv',
    },
  },
};
