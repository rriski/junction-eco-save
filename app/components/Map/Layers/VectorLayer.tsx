import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';

import OLVectorLayer from 'ol/layer/Vector';
import { Pixel } from 'ol/pixel';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';

import MapContext from '../MapContext';

interface Props {
  source: VectorSource;
  style: Style;
  zIndex?: number;
}

const VectorLayer: React.FC<Props> = forwardRef(({ source, style, zIndex = 0 }, ref) => {
  const { map } = useContext(MapContext);
  const vectorLayer = useRef<OLVectorLayer>();

  useEffect(() => {
    if (!map) return;

    vectorLayer.current = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer.current);
    vectorLayer.current.setZIndex(zIndex);

    return () => map?.removeLayer(vectorLayer);
  }, [map]);

  useImperativeHandle(ref, () => ({
    getFeatures: (pixel: Pixel) => vectorLayer.current?.getFeatures(pixel),
  }));

  return null;
});

export default VectorLayer;
