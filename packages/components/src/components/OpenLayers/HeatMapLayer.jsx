import { useContext, useEffect, useState } from 'react';
import HeatMap from 'ol/layer/Heatmap';
import { MapContext } from './Map';
const HeatMapLayer = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  const [heatMapLayer, setHeatMapLayer] = useState(null);
  useEffect(() => {
    if (!map) return;
    let heatMapLayer = new HeatMap({
      source,
      style,
      blur: parseInt(5, 10),
      radius: parseInt(5, 10),
    });
    map.addLayer(heatMapLayer);
    setHeatMapLayer(heatMapLayer);
    heatMapLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(heatMapLayer);
      }
    };
  }, [map]);
  useEffect(() => {
    heatMapLayer && heatMapLayer.setZIndex(zIndex);
  }, [zIndex]);
  return null;
};
export default HeatMapLayer;
