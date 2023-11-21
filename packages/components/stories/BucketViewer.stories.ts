import type { Meta, StoryObj } from '@storybook/react';

import { BucketViewer, BucketViewerProps } from '../src/components/BucketViewer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/BucketViewer',
  component: BucketViewer,
  tags: ['autodocs'],
  argTypes: {
    domain: {
      description:
        'Bucket domain URI',
    },
    suffix: {
      description:
        'Suffix of bucket domain',
    },
  },
};

export default meta;

type Story = StoryObj<BucketViewerProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  name: 'Bucket viewer',
  args: {
    domain: 'https://nwguide.fra1.digitaloceanspaces.com',
    suffix: '/'
  },
};

