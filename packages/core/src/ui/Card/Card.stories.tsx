import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
    component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

const blog = {
    urlPath: "#",
    title: "Card title goes here",
    date: "2021-01-01",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis accumsan maximus, quam libero porttitor nisl, vita",
}

export const Primary: Story = {
    render: () => (
        <Card className="md:col-span-3">
            <Card.Title href={`${blog.urlPath}`}>
                {blog.title}
            </Card.Title>
            <Card.Eyebrow
                as="time"
                dateTime={blog.date}
                className="md:hidden"
                decorate
            >
                {blog.date}
            </Card.Eyebrow>
            {blog.description && (
                <Card.Description>
                    {blog.description}
                </Card.Description>
            )}
            <Card.Cta>Read article</Card.Cta>
        </Card>
    ),
};
