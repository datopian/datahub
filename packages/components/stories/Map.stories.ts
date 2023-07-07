import type { Meta, StoryObj } from '@storybook/react';

import { Map, MapProps } from '../src/components/Map';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Map',
  component: Map,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'Data to be displayed.\n\n GeoJSON Object \n\nOR\n\n URL to GeoJSON Object',
    },
    title: {
      description: 'Title to display on the map. Optional.',
    },
    center: {
      description: 'Initial coordinates of the center of the map',
    },
    zoom: {
      description: 'Zoom level',
    },
    tooltip: {
      description: 'Tooltip settings'
    }
  },
};

export default meta;

type Story = StoryObj<MapProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const GeoJSONPolygons: Story = {
  name: 'GeoJSON polygons map',
  args: {
    data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_marine_polys.geojson',
    title: 'Seas and Oceans Map',
    center: { latitude: 45, longitude: 0 },
    zoom: 2,
    tooltip: { prop: 'name' },
  },
};

export const GeoJSONPoints: Story = {
  name: 'GeoJSON points map',
  args: {
    data: 'https://opendata.arcgis.com/datasets/9c58741995174fbcb017cf46c8a42f4b_25.geojson',
    title: 'Roads in York',
    center: { latitude: 53.9614, longitude: -1.0739 },
    zoom: 12,
    tooltip: { prop: 'Location' },
  },
};
