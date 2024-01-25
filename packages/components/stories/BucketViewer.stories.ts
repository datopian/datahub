import { type Meta, type StoryObj } from '@storybook/react';

import {
  BucketViewer,
  BucketViewerProps,
} from '../src/components/BucketViewer';
import LoadingSpinner from '../src/components/LoadingSpinner';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/BucketViewer',
  component: BucketViewer,
  tags: ['autodocs'],
  argTypes: {
    domain: {
      description: 'Bucket domain URI',
    },
    suffix: {
      description: 'Suffix of bucket domain',
    },
    downloadConfig: {
      description: `Bucket file download configuration`,
    },
    filterState: {
      description: `State with values used to filter the bucket files`,
    },
    paginationConfig: {
      description: `Configuration to show and stylise the pagination on the component`,
    },
  },
};

export default meta;

type Story = StoryObj<BucketViewerProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  name: 'Bucket viewer',
  args: {
    domain: 'https://ssen-smart-meter.datopian.workers.dev',
    suffix: '/',
    dataMapperFn: async (rawData: Response) => {
      const result = await rawData.json();
      return result.objects.map((e) => ({
        downloadFileUri: e.downloadLink,
        fileName: e.key.replace(/^(\w+\/)/g, ''),
        dateProps: {
          date: new Date(e.uploaded),
          dateFormatter: (date) => date.toLocaleDateString(),
        },
      }));
    },
  },
};

export const WithPagination: Story = {
  name: 'With pagination',
  args: {
    domain: 'https://ssen-smart-meter.datopian.workers.dev',
    suffix: '/',
    paginationConfig: {
      itemsPerPage: 3,
    },
    dataMapperFn: async (rawData: Response) => {
      const result = await rawData.json();
      return result.objects.map((e) => ({
        downloadFileUri: e.downloadLink,
        fileName: e.key.replace(/^(\w+\/)/g, ''),
        dateProps: {
          date: new Date(e.uploaded),
          dateFormatter: (date) => date.toLocaleDateString(),
        },
      }));
    },
  },
};

export const WithComponentOnHoverOfEachBucketFile: Story = {
  name: 'With component on hover of each bucket file',
  args: {
    domain: 'https://ssen-smart-meter.datopian.workers.dev',
    suffix: '/',
    downloadConfig: { hoverOfTheFileComponent: `HOVER COMPONENT` },
    dataMapperFn: async (rawData: Response) => {
      const result = await rawData.json();
      return result.objects.map((e) => ({
        downloadFileUri: e.downloadLink,
        fileName: e.key.replace(/^(\w+\/)/g, ''),
        dateProps: {
          date: new Date(e.uploaded),
          dateFormatter: (date) => date.toLocaleDateString(),
        },
      }));
    },
  },
};
