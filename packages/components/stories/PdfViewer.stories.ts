import type { Meta, StoryObj } from '@storybook/react';

import { PdfViewer, PdfViewerProps } from '../src/components/PdfViewer';

const meta: Meta = {
  title: 'Components/Embedding/PdfViewer',
  component: PdfViewer,
  tags: ['autodocs'],
  argTypes: {
    url: {
      description: 'URL to PDF file',
    },
    parentClassName: {
      description: 'Classname for the parent div of the pdf viewer',
    },
    layour: {
      description:
        'Set to true if you want to have a layout with zoom level, page count, printing button etc',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<PdfViewerProps>;

export const PdfViewerStory: Story = {
  name: 'PdfViewer',
  args: {
    url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
  },
};

export const PdfViewerStoryWithLayout: Story = {
  name: 'PdfViewer with the default layout',
  args: {
    url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
    layout: true,
  },
};

export const PdfViewerStoryWithHeight: Story = {
  name: 'PdfViewer with a custom height',
  args: {
    url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
    parentClassName: 'h-96',
    layout: true,
  },
};
