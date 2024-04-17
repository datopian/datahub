import type { Meta, StoryObj } from '@storybook/react';

import { PdfViewer, PdfViewerProps } from '../src/components/PdfViewer';

const meta: Meta = {
  title: 'Components/Embedding/PdfViewer',
  component: PdfViewer,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Object with a `url` property pointing to the PDF file to be displayed, e.g.: `{ url: "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK" }`.',
    },
    parentClassName: {
      description:
        'HTML classes to be applied to the container of the PDF viewer. [Tailwind](https://tailwindcss.com/) classes, such as `h-96` to define the height of the component, can be used on this field.',
    },
    layout: {
      description:
        'Set to `true` if you want to display a layout with zoom level, page count, printing button and other controls.',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<PdfViewerProps>;

export const PdfViewerStoryWithoutControlsLayout: Story = {
  name: 'PDF Viewer without controls layout',
  args: {
    data: {
      url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
    },
    parentClassName: 'h-96',
  },
};

export const PdfViewerStoryWithControlsLayout: Story = {
  name: 'PdfViewer with controls layout',
  args: {
    data: {
      url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
    },
    layout: true,
    parentClassName: 'h-96',
  },
};
