import { CSSProperties, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import loadData from '../lib/loadData';
import chroma from 'chroma-js';
import { GeospatialData } from '../types/properties';
import {
  MapContainer,
  TileLayer,
  GeoJSON as GeoJSONLayer,
  LayersControl,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export type MapProps = {
  layers: {
    data: GeospatialData;
    name: string;
    colorScale?: {
      starting: string;
      ending: string;
    };
    tooltip?:
      | {
          propNames: string[];
        }
      | boolean;
  }[];
  title?: string;
  center?: { latitude: number | undefined; longitude: number | undefined };
  zoom?: number;
  style?: CSSProperties;
  autoZoomConfiguration?: {
    layerName: string;
  };
};

export function Map({
  layers = [
    {
      data: null,
      name: null,
      colorScale: { starting: 'blue', ending: 'red' },
      tooltip: true,
    },
  ],
  center = { latitude: 45, longitude: 45 },
  zoom = 2,
  title = '',
  style = {},
  autoZoomConfiguration = undefined,
}: MapProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [layersData, setLayersData] = useState<any>([]);

  useEffect(() => {
    const loadDataPromises = layers.map(async (layer) => {
      const url = layer.data.url;
      const geojson = layer.data.geojson;
      let layerData: any;

      if (url) {
        //  If "data" is string, assume it's a URL
        setIsLoading(true);
        layerData = await loadData(url).then((res: any) => {
          return JSON.parse(res);
        });
      } else {
        //  Else, expect raw GeoJSON
        layerData = geojson;
      }

      if (layer.colorScale) {
        const colorScaleAr = chroma
          .scale([layer.colorScale.starting, layer.colorScale.ending])
          .mode('lch')
          .colors(layerData.features.length);

        layerData.features.forEach((feature, i) => {
          //  Only style if the feature doesn't have a color prop
          if (feature.color === undefined) {
            feature.color = colorScaleAr[i];
          }
        });
      }

      return { name: layer.name, data: layerData };
    });

    Promise.all(loadDataPromises).then((values) => {
      setLayersData(values);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
      <LoadingSpinner />
    </div>
  ) : (
    <MapContainer
      key={layersData}
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-80 w-full"
      style={style ?? {}}
      // @ts-ignore
      whenReady={(map: any) => {
        //  Enable zoom using scroll wheel
        map.target.scrollWheelZoom.enable();

        //  Create the title box
        var info = new L.Control() as any;

        info.onAdd = function () {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
        };

        info.update = function () {
          this._div.innerHTML = `<h4 style="font-weight: 600; background: #f9f9f9; padding: 5px; border-radius: 5px; color: #464646;">${title}</h4>`;
        };

        if (title) info.addTo(map.target);
        if (!autoZoomConfiguration) return;

        let layerToZoomBounds = L.latLngBounds(L.latLng(0, 0), L.latLng(0, 0));

        layers.forEach((layer) => {
          if (layer.name === autoZoomConfiguration.layerName) {
            const data = layersData.find(
              (layerData) => layerData.name === layer.name
            )?.data;

            if (data) {
              layerToZoomBounds = L.geoJSON(data).getBounds();
              return;
            }
          }
        });

        map.target.fitBounds(layerToZoomBounds);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="bottomright">
        {layers.map((layer) => {
          const data = layersData.find(
            (layerData) => layerData.name === layer.name
          )?.data;

          return (
            data && (
              <LayersControl.Overlay key={layer.name} checked name={layer.name}>
                <GeoJSONLayer
                  data={data}
                  //  @ts-ignore
                  pointToLayer={(feature, latlng) => {
                    //  This resolver an issue in which the bundled map was
                    //  not finding the images
                    const leafletBase =
                      'https://unpkg.com/leaflet@1.9.4/dist/images/';

                    const icon = new L.Icon({
                      iconUrl: leafletBase + 'marker-icon.png',
                      iconRetinaUrl: leafletBase + 'marker-icon-2x.png',
                      shadowUrl: leafletBase + 'marker-shadow.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      tooltipAnchor: [16, -28],
                      shadowSize: [41, 41],
                    });

                    const iconMarker = L.marker(latlng, { icon });
                    return iconMarker;
                  }}
                  style={(geoJsonFeature: any) => {
                    //  Set the fill color of each feature when appliable
                    if (
                      !['Point', 'MultiPoint'].includes(geoJsonFeature.type)
                    ) {
                      return { color: geoJsonFeature?.color };
                    }
                  }}
                  eventHandlers={{
                    add: (e) => {
                      const featureGroup = e.target;
                      const tooltip = layer.tooltip;

                      featureGroup.eachLayer((featureLayer) => {
                        const feature = featureLayer.feature;
                        const geometryType = feature.geometry.type;

                        if (tooltip) {
                          const featurePropNames = Object.keys(
                            feature.properties
                          );
                          let includedFeaturePropNames;

                          if (tooltip === true) {
                            includedFeaturePropNames = featurePropNames;
                          } else {
                            includedFeaturePropNames = tooltip.propNames.filter(
                              (name) => featurePropNames.includes(name)
                            );
                          }

                          if (includedFeaturePropNames) {
                            const tooltipContent = includedFeaturePropNames
                              .map(
                                (name) =>
                                  `<b>${name}:</b> ${feature.properties[name]}`
                              )
                              .join('<br />');

                            featureLayer.bindTooltip(tooltipContent, {
                              direction: 'center',
                            });
                          }
                        }

                        featureLayer.on({
                          mouseover: (event) => {
                            if (
                              ['Polygon', 'MultiPolygon'].includes(geometryType)
                            ) {
                              event.target.setStyle({
                                fillOpacity: 0.5,
                              });
                            }
                          },
                          mouseout: (event) => {
                            if (
                              ['Polygon', 'MultiPolygon'].includes(geometryType)
                            ) {
                              event.target.setStyle({
                                fillOpacity: 0.2,
                              });
                            }
                          },
                        });
                      });
                    },
                  }}
                />
                ;
              </LayersControl.Overlay>
            )
          );
        })}
      </LayersControl>
    </MapContainer>
  );
}
