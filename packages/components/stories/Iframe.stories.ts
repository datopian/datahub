import { type Meta, type StoryObj } from '@storybook/react';

import { Iframe, IframeProps } from '../src/components/Iframe';

const meta: Meta = {
  title: 'Components/Iframe',
  component: Iframe,
  tags: ['autodocs'],
  argTypes: {
    url: {
      description:
        'Page to display inside of the component',
    },
    style: {
      description:
        'Style of the component',
    },
  },
};

export default meta;

type Story = StoryObj<IframeProps>;

export const Normal: Story = {
  name: 'Iframe',
  args: {
    url: 'https://ssen-smart-meter.datopian.workers.dev',
    style: {width: `100%`}
  },
};
