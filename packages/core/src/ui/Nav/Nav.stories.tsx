import type { Meta, StoryObj } from '@storybook/react';

import { NavTitle } from './NavTitle';

const meta: Meta<typeof NavTitle> = {
    component: NavTitle,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NavTitle>;

export const Basic: Story = {
    args: {
        title: 'Title',
        logo: 'https://via.placeholder.com/50',
    },
};

export const WithVersion: Story = {
    args: {
        title: 'Title',
        logo: 'https://via.placeholder.com/50',
        version: 'Alpha',
    },
};
