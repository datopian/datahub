import type { Meta, StoryObj } from '@storybook/react';

import { Map, MapProps } from '../src/components/Map';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Geospatial/Map',
  component: Map,
  tags: ['autodocs'],
  argTypes: {
    layers: {
      description:
        'Array of layers to be displayed on the map. Should be an object with: \n\n \
`data`: object with either a `url` property pointing to a GeoJSON file or a `geojson` property with a GeoJSON object. \n\n \
`name`: name of the layer. \n\n \
`colorscale`: object with a `starting` and `ending` colors that will be used to create a gradient and color the map. \n\n \
`tooltip`: `true` to show all available features on the tooltip, object with a `propNames` property as an array of strings to choose which features to display. \n\n',
    },
    title: {
      description: 'Title to display on the map.',
    },
    center: {
      description: 'Initial coordinates of the center of the map',
    },
    zoom: {
      description: 'Initial zoom level',
    },
    style: {
      description: "CSS styles to be applied to the map's container.",
    },
    autoZoomConfiguration: {
      description:
        "Pass a layer's name to automatically zoom to the bounding area of a layer.",
    },
  },
};

export default meta;

type Story = StoryObj<MapProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const GeoJSONPolygons: Story = {
  name: 'GeoJSON polygons map',
  args: {
    tileLayerName:'OpenStreetMap',
    tileLayerOptions:{
      accessToken : 'pk.eyJ1Ijoid2lsbHktcGFsbWFyZWpvIiwiYSI6ImNqNzk5NmRpNDFzb2cyeG9sc2luMHNjajUifQ.lkoVRFSI8hOLH4uJeOzwXw',
    },
    layers: [
      {
        data: {
          url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_marine_polys.geojson',
        },
        name: 'Polygons',
        tooltip: { propNames: ['name'] },
        colorScale: {
          starting: '#ff0000',
          ending: '#00ff00',
        },
      },
    ],
    title: 'Seas and Oceans Map',
    center: { latitude: 45, longitude: 0 },
    zoom: 2,
  },
};

export const GeoJSONPoints: Story = {
  name: 'GeoJSON points map',
  args: {
    layers: [
      {
        data: {
          url: 'https://opendata.arcgis.com/datasets/9c58741995174fbcb017cf46c8a42f4b_25.geojson',
        },
        name: 'Points',
        tooltip: { propNames: ['Location'] },
      },
    ],
    title: 'Roads in York',
    center: { latitude: 53.9614, longitude: -1.0739 },
    zoom: 12,
  },
};

export const GeoJSONMultipleLayers: Story = {
  name: 'GeoJSON polygons and points map',
  args: {
    layers: [
      {
        data: {
          url: 'https://opendata.arcgis.com/datasets/9c58741995174fbcb017cf46c8a42f4b_25.geojson',
        },
        name: 'Points',
        tooltip: true,
      },
      {
        data: {
          url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_marine_polys.geojson',
        },
        name: 'Polygons',
        tooltip: true,
        colorScale: {
          starting: '#ff0000',
          ending: '#00ff00',
        },
      },
    ],
    title: 'Polygons and points',
    center: { latitude: 45, longitude: 0 },
    zoom: 2,
  },
};

export const GeoJSONMultipleLayersWithAutoZoomInSpecifiedLayer: Story = {
  name: 'GeoJSON polygons and points map with auto zoom in the points layer',
  args: {
    layers: [
      {
        data: {
          url: 'https://opendata.arcgis.com/datasets/9c58741995174fbcb017cf46c8a42f4b_25.geojson',
        },
        name: 'Points',
        tooltip: true,
      },
      {
        data: {
          url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_marine_polys.geojson',
        },
        name: 'Polygons',
        tooltip: true,
        colorScale: {
          starting: '#ff0000',
          ending: '#00ff00',
        },
      },
    ],
    title: 'Polygons and points',
    center: { latitude: 45, longitude: 0 },
    zoom: 2,
    autoZoomConfiguration: {
      layerName: 'Points',
    },
  },
};
