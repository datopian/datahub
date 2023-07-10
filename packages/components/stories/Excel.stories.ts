import type { Meta, StoryObj } from '@storybook/react';

import { Excel, ExcelProps } from '../src/components/Excel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Excel',
  component: Excel,
  tags: ['autodocs'],
  argTypes: {
    url: {
      description:
        'Data to be displayed.\n\n E.g.: [["1990", 1], ["1991", 2]] \n\nOR\n\n "https://url.to/data.csv"',
    },
  },
};

export default meta;

type Story = StoryObj<ExcelProps>;

export const FromURL: Story = {
  name: 'Excel spreadsheet from URL',
  args: {
    url: 'https://sheetjs.com/pres.xlsx',
  },
};
