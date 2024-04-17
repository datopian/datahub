import { type Meta, type StoryObj } from '@storybook/react';

import { Iframe, IframeProps } from '../src/components/Iframe';

const meta: Meta = {
  title: 'Components/Embedding/Iframe',
  component: Iframe,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Object with a `url` property pointing to the page to be embeded.',
    },
    style: {
      description:
        'Style object of the component. See example at https://react.dev/learn#displaying-data. Defaults to `{ width: "100%", height: "100%" }`',
    },
  },
};

export default meta;

type Story = StoryObj<IframeProps>;

export const Normal: Story = {
  name: 'Iframe',
  args: {
    data: {
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYzBmN2Q2MzYtYzE3MS00ODkxLWE5OWMtZTQ2MjBlMDljMDk4IiwidCI6Ijk1M2IwZjgzLTFjZTYtNDVjMy04MmM5LTFkODQ3ZTM3MjMzOSIsImMiOjh9',
    },
    style: { width: `100%`, height: `100%` },
  },
};
