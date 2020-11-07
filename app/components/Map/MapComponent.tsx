import { useRef, useState, useEffect } from 'react';

import { View, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import styled from 'styled-components';

import MapContext from './MapContext';

interface Props {
  zoom: number;
  center: Coordinate;
}

const MapComponent: React.FC<Props> = ({ children, zoom, center }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const options = {
      view: new View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = new Map(options);

    if (mapRef.current) {
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);
    }

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    map?.getView()?.setZoom(zoom);
  }, [map, zoom]);

  useEffect(() => {
    map?.getView()?.setCenter(center);
  }, [map, center]);

  return (
    <MapContext.Provider value={{ map }}>
      <MapContainer ref={mapRef}>{children}</MapContainer>
    </MapContext.Provider>
  );
};

const MapContainer = styled.div`
  height: 600px;
  width: 100%;
  border-radius: ${(p) => p.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${(p) => p.theme.shadow.default};
`;

export default MapComponent;
