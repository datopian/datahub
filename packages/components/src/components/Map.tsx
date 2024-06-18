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
import providers from '../lib/tileLayerPresets';

type VariantKeys<T> = T extends { variants: infer V }
  ? {
      [K in keyof V]: K extends string
        ? `${K}` | `${K}.${VariantKeys<V[K]>}`
        : never;
    }[keyof V]
  : never;

type ProviderVariantKeys<T> = {
  [K in keyof T]: K extends string
    ? `${K}` | `${K}.${VariantKeys<T[K]>}`
    : never;
}[keyof T];

type TileLayerPreset = ProviderVariantKeys<typeof providers> | 'custom';

interface TileLayerSettings extends L.TileLayerOptions {
  url?: string;
  variant?: string | any;
}

export type MapProps = {
  tileLayerName: TileLayerPreset;
  tileLayerOptions?: TileLayerSettings | undefined;
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

const tileLayerDefaultName = process?.env
  .NEXT_PUBLIC_MAP_TILE_LAYER_NAME as TileLayerPreset;

const tileLayerDefaultOptions = Object.keys(process?.env)
  .filter((key) => key.startsWith('NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_'))
  .reduce((obj, key) => {
    obj[key.split('NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_')[1]] = process.env[key];
    return obj;
  }, {}) as TileLayerSettings;

export function Map({
  tileLayerName = tileLayerDefaultName || 'OpenStreetMap',
  tileLayerOptions,
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

  /*
  tileLayerDefaultOptions
  extract all environment variables thats starts with NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_.
    the variables names are the same as the TileLayer object properties:
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_url:
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_attribution
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_accessToken
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_id
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_ext
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_bounds
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_maxZoom
    - NEXT_PUBLIC_MAP_TILE_LAYER_OPTION_minZoom
    see TileLayerOptions inteface
   */

  //tileLayerData prioritizes properties passed through component over those passed through .env variables
  tileLayerOptions = Object.assign(tileLayerDefaultOptions, tileLayerOptions);

  let provider = {
    url: tileLayerOptions.url,
    options: tileLayerOptions,
  };

  if (tileLayerName != 'custom') {
    var parts = tileLayerName.split('.');
    var providerName = parts[0];
    var variantName: string = parts[1];

    //make sure to declare a variant if url depends on a variant: assume first
    if (providers[providerName].url?.includes('{variant}') && !variantName)
      variantName = Object.keys(providers[providerName].variants)[0];

    console.log(variantName);

    if (!providers[providerName]) {
      throw 'No such provider (' + providerName + ')';
    }

    provider = {
      url: providers[providerName].url,
      options: providers[providerName].options,
    };

    // overwrite values in provider from variant.
    if (variantName && 'variants' in providers[providerName]) {
      if (!(variantName in providers[providerName].variants)) {
        throw 'No such variant of ' + providerName + ' (' + variantName + ')';
      }
      var variant = providers[providerName].variants[variantName];
      var variantOptions;
      if (typeof variant === 'string') {
        variantOptions = {
          variant: variant,
        };
      } else {
        variantOptions = variant.options;
      }
      provider = {
        url: variant.url || provider.url,
        options: L.Util.extend({}, provider.options, variantOptions),
      };
    }

    var attributionReplacer = function (attr) {
      if (attr.indexOf('{attribution.') === -1) {
        return attr;
      }
      return attr.replace(
        /\{attribution.(\w*)\}/g,
        function (match: any, attributionName: string) {
          match;
          return attributionReplacer(
            providers[attributionName].options.attribution
          );
        }
      );
    };

    provider.options.attribution = attributionReplacer(
      provider.options.attribution
    );
  }

  var tileLayerData = L.Util.extend(
    {
      url: provider.url,
    },
    provider.options,
    tileLayerOptions
  );

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
      {tileLayerData.url && <TileLayer {...tileLayerData} />}

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
