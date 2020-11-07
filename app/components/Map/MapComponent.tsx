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

export const MapContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 600px;
  background-color: ${(p) => p.theme.colors['grey-light']};
  border-radius: ${(p) => p.theme.borderRadius.large};
  box-shadow: ${(p) => p.theme.shadow.default};
`;

export default MapComponent;
