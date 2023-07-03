import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import loadData from '../lib/loadData';
import chroma from 'chroma-js';
import {
  MapContainer,
  TileLayer,
  GeoJSON as GeoJSONLayer,
  useMap,
} from 'react-leaflet';

import * as L from 'leaflet';

export type MapProps = {
  data: string | GeoJSON.GeoJSON;
  title?: string;
  colorScale?: {
    starting: string;
    ending: string;
  };
  center?: { latitude: number | undefined; longitude: number | undefined };
  zoom?: number;
  tooltip?: {
    prop: string;
  };
};

export function Map({
  data,
  title = '',
  colorScale = { starting: 'blue', ending: 'red' },
  center = { latitude: 45, longitude: 45 },
  zoom = 2,
  tooltip = {
    prop: '',
  },
}: MapProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  title;
  //  By default, assumes data is an Array...
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    //  If data is string, assume it's a URL
    if (typeof data === 'string') {
      setIsLoading(true);

      loadData(data).then((res: any) => {
        const geoJsonObject = JSON.parse(res);

        const colorScaleAr = chroma
          .scale([colorScale.starting, colorScale.ending])
          .mode('lch')
          .colors(geoJsonObject.features.length);

        geoJsonObject.features.forEach((feature, i) => {
          if (feature.color === undefined) {
            feature.color = colorScaleAr[i];
          }
        });

        setGeoJsonData(geoJsonObject);
        setIsLoading(false);
      });
    } else {
      setGeoJsonData(data);
    }
  }, []);

  const onEachFeature = (feature, layer) => {
    const map = useMap();

    const geometryType = feature.type;

    if (tooltip.prop)
      layer.bindTooltip(feature.properties[tooltip.prop], {
        direction: 'center',
      });

    layer.on({
      mouseover: (event) => {
        if (['Polygon', 'MultiPolygon'].includes(geometryType)) {
          event.target.setStyle({
            fillColor: '#B85042',
          });
        }
      },
      mouseout: (event) => {
        if (['Polygon', 'MultiPolygon'].includes(geometryType)) {
          event.target.setStyle({
            fillColor: '#A7BEAE',
          });
        }
      },
    });
  };

  return isLoading || !geoJsonData ? (
    <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
      <LoadingSpinner />
    </div>
  ) : (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-[500px]"
      whenReady={(map) => {
        map.target.scrollWheelZoom.enable();

        var info = L.control();

        info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
        };

        info.update = function (props) {
          this._div.innerHTML = `<h4 style="font-weight: 600; background: #f9f9f9; padding: 5px; border-radius: 5px; color: #464646;">${title}</h4>`;
        };

        if (title) info.addTo(map.target);
      }}
    >
      <GeoJSONLayer
        data={geoJsonData}
        style={(geoJsonFeature) => {
          return { color: geoJsonFeature.color };
        }}
        onEachFeature={onEachFeature}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
