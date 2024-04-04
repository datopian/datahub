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
    url: 'https://app.powerbi.com/view?r=eyJrIjoiYzBmN2Q2MzYtYzE3MS00ODkxLWE5OWMtZTQ2MjBlMDljMDk4IiwidCI6Ijk1M2IwZjgzLTFjZTYtNDVjMy04MmM5LTFkODQ3ZTM3MjMzOSIsImMiOjh9',
    style: {width: `100%`, height: `100%`}
  },
};
