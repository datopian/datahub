import type { Meta, StoryObj } from '@storybook/react';

import { Excel, ExcelProps } from '../src/components/Excel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Tabular/Excel',
  component: Excel,
  tags: ['autodocs'],
  argTypes: {
    url: {
      description:
        'Url of the file to be displayed e.g.: "https://url.to/data.csv"',
    },
  },
};

export default meta;

type Story = StoryObj<ExcelProps>;

export const SingleSheet: Story = {
  name: 'Excel file with just one sheet',
  args: {
    url: 'https://sheetjs.com/pres.xlsx',
  },
};

export const MultipleSheet: Story = {
  name: 'Excel file with multiple sheets',
  args: {
    url: 'https://storage.portaljs.org/IC-Gantt-Chart-Project-Template-8857.xlsx',
  },
};
