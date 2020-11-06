import {useContext, useEffect} from 'react';

import OLTileLayer from 'ol/layer/Tile';

import MapContext from '../MapContext';

const TileLayer = ({source, zIndex = 0}) => {
  const {map} = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      map?.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

export default TileLayer;