import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';

import { Extent } from 'ol/extent';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import OLVectorLayer from 'ol/layer/Vector';
import { Pixel } from 'ol/pixel';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';

import MapContext from '../MapContext';

interface Props {
  source: VectorSource | undefined;
  style: Style;
  zIndex?: number;
  centerOnChange?: boolean;
}

export interface ForwardRefProps {
  getFeatures: (pixel: Pixel) => Promise<Feature<Geometry>[] | undefined>;
  fitToMap: (extent: Extent | Geometry) => void;
}

const VectorLayer = forwardRef<ForwardRefProps, Props>(
  ({ source, style, zIndex = 0, centerOnChange }, ref) => {
    const { map } = useContext(MapContext);
    const vectorLayer = useRef<OLVectorLayer>();

    useEffect(() => {
      if (!map) return;

      vectorLayer.current = new OLVectorLayer({
        source,
        style,
      });

      vectorLayer.current.getFeatures;

      map.addLayer(vectorLayer.current);
      vectorLayer.current.setZIndex(zIndex);

      return () => map?.removeLayer(vectorLayer);
    }, [map]);

    useEffect(() => {
      if (vectorLayer.current && source) {
        vectorLayer.current.setSource(source);
      }
    }, [source]);

    const fitToMap = (extent: Extent | Geometry) => {
      map.getView().fit(extent, { padding: [100, 100, 100, 100] });
    };

    useImperativeHandle(ref, () => ({
      getFeatures: async (pixel: Pixel) => vectorLayer.current?.getFeatures(pixel),
      fitToMap,
    }));

    return null;
  }
);

export default VectorLayer;
