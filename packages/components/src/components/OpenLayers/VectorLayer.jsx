import { useContext, useEffect, useState } from 'react';
import OLVectorLayer from 'ol/layer/Vector';
import { MapContext } from './Map';
const VectorLayer = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  const [vectorLayer, setVectorLayer] = useState(null);
  useEffect(() => {
    if (!map) return;
    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });
    const vectorSource = vectorLayer.getSource();
    vectorSource.on('featuresloadend', function () {
      vectorSource.getFeatures().forEach((feature, index) => {
        feature.setId(index);
      });
    });
    map.addLayer(vectorLayer);
    setVectorLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);
  useEffect(() => {
    vectorLayer && vectorLayer.setZIndex(zIndex);
  }, [zIndex]);
  return null;
};
export default VectorLayer;
