import { useRef, useState, useEffect } from 'react';

import { View, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Pixel } from 'ol/pixel';
import styled from 'styled-components';

import MapContext from './MapContext';

interface Props {
  onClick: (e: Pixel) => void;
  zoom: number;
  center: Coordinate;
}

const MapComponent: React.FC<Props> = ({ children, onClick, zoom, center }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const options = {
      view: new View({ zoom, center, minZoom: 13, maxZoom: 19 }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = new Map(options);

    mapObject.on('click', function (e) {
      onClick(e.pixel);
    });

    if (mapRef.current) {
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);
    }

    return () => mapObject.setTarget(undefined);
  }, []);

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
