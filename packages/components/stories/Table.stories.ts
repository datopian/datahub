import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableProps } from '../src/components/Table';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: "Data to be displayed in the table, must also set \"cols\" to work."
    },
    cols: {
      description: "Columns to be displayed in the table, must also set \"data\" to work."
    },
    csv: {
      description: "CSV data as string.",
    },
    url: {
      description: "Fetch the data from a CSV file remotely."
    }
  },
};

export default meta;

type Story = StoryObj<TableProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FromColumnsAndData: Story = {
  name: "Table from columns and data",
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
    cols: [
      { key: 'id', name: 'ID' },
      { key: 'firstName', name: 'First name' },
      { key: 'lastName', name: 'Last name' },
      { key: 'age', name: 'Age' },
    ],
  },
};

export const FromRawCSV: Story = {
  name: "Table from raw CSV",
  args: {
    csv: `
    Year,Temp Anomaly
    1850,-0.418
    2020,0.923
    `
  }
};

export const FromURL: Story = {
  name: "Table from URL",
  args: {
    url: "https://raw.githubusercontent.com/datasets/finance-vix/main/data/vix-daily.csv"
  }
};

