import React from 'react';
import { Meta, Story, StoryFn } from '@storybook/react';
import { Table, TableProps } from '../src';

const meta: Meta = {
  title: 'Table',
  component: Table,
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
  argTypes: {
    data: {
      description: 'Data that will be displayed in the table',
      control: 'object',
    },
    cols: {
      description: 'Columns that are going to be displayed in the table',
      control: 'object',
    },
  },
};

export default meta;

const Template: StoryFn<TableProps> = (args) => <Table {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
