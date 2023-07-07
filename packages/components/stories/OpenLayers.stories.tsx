import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import OpenLayers from '../src/components/OpenLayers/OpenLayers';

const meta: Meta = {
  title: 'Components/OpenLayers',
  component: OpenLayers,
  argTypes: {
    layers: {
      description: 'Layers to be added to the map',
      control: {
        type: 'array',
      },
    },
    center: {
      description: 'Center of the map',
      defaultValue: [0, 0],
      control: {
        type: 'array',
      },
    },
    zoom: {
      description: 'Zoom level of the map',
      defaultValue: 1,
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;

type Story = StoryObj<any>;

export const Secondary: Story = {
  name: 'Map with OpenLayers',
  args: {
    layers: [
      {
        url: 'https://openlayers.org/data/vector/ecoregions.json',
        name: 'Ecoregions',
      },
    ],
  },
};

export const Primary: Story = {
  name: 'Map with OpenLayers 2',
  args: {
    layers: [
      {
        url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_marine_polys.geojson',
        name: 'Marine regions',
      },
    ],
  },
};

export const MapWithPopover: Story = {
  name: 'Map with popup',
  args: {
    layers: [
      {
        url: 'https://openlayers.org/data/vector/ecoregions.json',
        name: 'Ecoregions',
      },
    ],
    popup: (feature: any) => {
      return (
        <div className="flex flex-col gap-y-1" style={{ color: 'red' }}>
          <span className="font-bold">Biome name</span>
          <span className="text-sm">{feature.values_.BIOME_NAME}</span>
        </div>
      );
    },
  },
};

export const Third: Story = {
  name: 'Map with two layers',
  args: {
    layers: [
      {
        url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_geography_marine_polys.geojson',
        name: 'Marine regions',
      },
      {
        url: 'https://openlayers.org/data/vector/ecoregions.json',
        name: 'Ecoregions',
      },
    ],
  },
};

export const CustomCenter: Story = {
  name: 'Map with custom center and zoom',
  args: {
    layers: [
      {
        url: 'https://openlayers.org/data/vector/ecoregions.json',
        name: 'Ecoregions',
      },
    ],
    center: [-15, 20],
    zoom: 4,
  },
};

export const PointsOnMap: Story = {
  name: 'Map with points on',
  args: {
    layers: [
      {
        url: 'https://opendata.arcgis.com/datasets/9c58741995174fbcb017cf46c8a42f4b_25.geojson',
        name: 'E-Scooter Parking Bays',
      },
    ],
    center: [-1.055429957881787, 53.963900188025301],
    zoom: 12,
  },
};

export const KMLFile: Story = {
  name: 'Map with KML File',
  args: {
    layers: [
      {
        url: 'https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
        name: '2012 Earthquakes M5+',
        format: 'kml',
        heatmap: true,
      },
    ],
  },
};
