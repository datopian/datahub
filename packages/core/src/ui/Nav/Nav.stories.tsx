import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Nav } from './Nav';
import { SiteToc } from '../SiteToc';

const meta: Meta<typeof Nav> = {
  component: Nav,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Nav>;

export const Basic: Story = {
  args: {
    title: 'Title',
    logo: 'https://via.placeholder.com/50',
  },
};

export const MobileWithChildren: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    title: 'Title',
    logo: 'https://via.placeholder.com/50',
    links: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'About',
        href: '/about',
      },
      {
        name: 'Blog',
        href: '/blog',
      },
    ],
    children: <SiteToc currentPath="about" nav={getNav()} />,
  },
};

function getNav() {
  return [
    {
      name: 'about',
      href: 'about',
    },
    {
      name: 'page2',
      href: 'page2',
    },
    {
      name: 'page3',
      href: 'page3',
    },
    {
      name: 'page4',
      href: 'page4',
    },
    {
      name: 'page5',
      href: 'page5',
    },
    {
      name: 'page6',
      href: 'page6',
    },
    {
      name: 'page7',
      href: 'page7',
    },
    {
      name: 'page8',
      href: 'page8',
    },
    {
      name: 'page9',
      href: 'page9',
    },
    {
      name: 'Blog',
      path: 'blog',
      level: 0,
      children: [
        {
          name: 'My SEO blog post fail',
          href: 'blog/blog-post-fail',
        },
        {
          name: 'Schedule Your Social marketing',
          href: 'blog/schedule-your-social-marketing',
        },
      ],
    },
    {
      name: 'Dev',
      path: 'dev',
      level: 0,
      children: [
        {
          name: 'columns-vs-flex-vs-grid',
          href: 'dev/columns-vs-flex-vs-grid',
        },
        {
          name: 'how-to-test-web-apps',
          href: 'dev/how-to-test-web-apps',
        },
        {
          name: 'instance-type',
          href: 'dev/instance-type',
        },
      ],
    },
    {
      name: 'Marketing',
      path: 'marketing',
      level: 0,
      children: [
        {
          name: 'seo',
          href: 'marketing/seo',
        },
      ],
    },
    {
      name: 'Productivity',
      path: 'productivity',
      level: 0,
      children: [
        {
          name: 'effective-macos-task-management',
          href: 'productivity/effective-macos-task-management',
        },
        {
          name: 'productivity-system',
          href: 'productivity/productivity-system',
        },
      ],
    },
    {
      name: 'Tech',
      path: 'tech',
      level: 0,
      children: [
        {
          name: 'roll-your-own-personal-backups',
          href: 'tech/roll-your-own-personal-backups',
        },
      ],
    },
  ];
}
