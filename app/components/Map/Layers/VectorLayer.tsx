import { useContext, useEffect } from 'react';

import OLVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';

import MapContext from '../MapContext';

interface Props {
  source: VectorSource;
  style: Style;
  zIndex?: number;
}

const VectorLayer: React.FC<Props> = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => map?.removeLayer(vectorLayer);
  }, [map]);

  return null;
};

export default VectorLayer;
