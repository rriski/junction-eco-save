import { useRef, useState, useEffect } from 'react'

import { View, Map } from 'ol';
import styled from 'styled-components'

import MapContext from './MapContext';

const MapComponent = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState<Map>(null);

  // on component mount
  useEffect(() => {
    const options = {
      view: new View({ zoom, center }),
      layers:   [],
      controls: [],
      overlays: []
    };

    const mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    map?.getView()?.setZoom(zoom);
  }, [map, zoom]);

  // center change handler
  useEffect(() => {

    map?.getView()?.setCenter(center)
  }, [map, center])

  return (
    <MapContext.Provider value={{ map }}>
      <MapContainer ref={mapRef} className="ol-map">
        {children}
      </MapContainer>
    </MapContext.Provider>
  )
}

const MapContainer = styled.div`
    min-width: 600px;
    min-height: 500px;
    margin: 50px;
    height: 500px;
    width: "100%";
`

export default MapComponent;