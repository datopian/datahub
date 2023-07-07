import { useEffect, useState } from 'react';
import Map from './Map';
import { Layers } from './Layers';
import { Fill, Icon, Style } from 'ol/style';
import * as olSource from 'ol/source';
import TileLayer from './TileLayer';
import { fromLonLat } from 'ol/proj';
import VectorLayer from './VectorLayer';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
import { colors } from './colors';
import { FullScreenControl, Controls, ListOfCheckboxes } from './Controls';
import HeatMapLayer from './HeatMapLayer';

function osm() {
  return new olSource.OSM();
}

const formats = {
  geojson: new GeoJSON(),
  kml: new KML(),
};

interface OpenLayersProps {
  layers: {
    url: string;
    name?: string;
    format?: string;
    heatmap?: boolean;
  }[];
  center?: [number, number];
  zoom?: number;
  popup?: (selected: any) => JSX.Element;
}

export function OpenLayers({
  layers,
  center = [0, 0],
  zoom = 1,
  popup,
}: OpenLayersProps) {
  const [shownLayers, setShownLayers] = useState(
    layers.map((layer) => layer.url)
  );
  const [selected, setSelected] = useState(null);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const style = new Style({
      fill: new Fill({
        color: '#eeeeee',
      }),
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        width: 18,
        height: 28,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/418px-Google_Maps_icon_%282020%29.svg.png?20200218211225',
      }),
    });
    setStyle(style);
  }, []);

  return (
    <div className="relative">
      <Map
        center={fromLonLat(center)}
        zoom={zoom}
        setSelected={popup ? setSelected : null}
      >
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {layers.map((layer, index) =>
            !layer.heatmap ? (
              <VectorLayer
                key={index}
                zIndex={shownLayers.includes(layer.url) ? 1 : -1}
                source={
                  new VectorSource({
                    url: layer.url,
                    format: layer.format
                      ? formats[layer.format]
                      : new GeoJSON(),
                  })
                }
                style={function (feature) {
                  const id = feature.getId();
                  const color = feature.get('COLOR') || colors[id % 1302].hex;
                  style.getFill().setColor(color);
                  return style;
                }}
              />
            ) : (
              <HeatMapLayer
                key={index}
                zIndex={shownLayers.includes(layer.url) ? 1 : -1}
                source={
                  new VectorSource({
                    url: layer.url,
                    format: layer.format
                      ? formats[layer.format]
                      : new GeoJSON(),
                  })
                }
                style={function (feature) {
                  const color =
                    feature.get('COLOR') || colors[feature.ol_uid % 1302].hex;
                  style.getFill().setColor(color);
                  return style;
                }}
              />
            )
          )}
        </Layers>
        {/* add a floating pane that will output the ListOfCheckboxes component using tailwind*/}
        <div className="absolute bottom-0 right-0 m-4 p-4 z-50 bg-white rounded-lg shadow-xl">
          <ListOfCheckboxes
            layers={layers}
            shownLayers={shownLayers}
            setShownLayers={setShownLayers}
          />
        </div>
        {popup && selected && (
          <div className="absolute bottom-0 left-0 m-4 p-4 z-50 bg-white rounded-lg shadow-xl">
            {popup(selected)}
          </div>
        )}
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
}
