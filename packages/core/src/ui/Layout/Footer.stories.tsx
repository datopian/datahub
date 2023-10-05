import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
    component: Footer,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Basic: Story = {
    args: {
        author: {
            name: "John Doe",
        }
    },
};


export const Links: Story = {
    args: {
        links: [
            { name: "Link A", href: "#" },
            { name: "Link B", href: "#" }
        ],
        author: {
            name: "John Doe",
        }
    },
};


export const Logo: Story = {
    args: {
        links: [
            { name: "Link A", href: "#" },
            { name: "Link B", href: "#" }
        ],
        author: {
            name: "John Doe",
            logo: "https://via.placeholder.com/150"
        }
    },
};
