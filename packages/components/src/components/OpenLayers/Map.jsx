import React, { useRef, useState, useEffect } from 'react';
import * as ol from 'ol';

export const MapContext = new React.createContext();

const Map = ({ children, zoom, center, setSelected }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (map) {
      if (setSelected !== null) {
        let selected = null;
        map.on('pointermove', function (e) {
          map.forEachFeatureAtPixel(e.pixel, function (f) {
            selected = f;
            return true;
          });
          if (selected) {
            setSelected(selected);
          } else {
            setSelected(null);
          }
        });
      }
    }
  }, [map]);
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="w-full h-[500px]">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
