<<<<<<< HEAD
<<<<<<< HEAD
import { useRef, useState, useEffect, FC } from 'react'
=======
import {useRef, useState, useEffect} from 'react'
>>>>>>> 3452ce2... Lint stuff
=======
import { useRef, useState, useEffect } from 'react';
>>>>>>> 7936303... Stuff

import { View, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import styled from 'styled-components';

import MapContext from './MapContext';

interface Props {
<<<<<<< HEAD
<<<<<<< HEAD
  zoom?: any;
  center?: any;
}

const MapComponent: FC<Props> = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState<Map>();

  // on component mount
  useEffect(() => {
    const options = {
      view: new View({ zoom, center }),
=======
  zoom: number,
  center: number
=======
  zoom: number;
  center: Coordinate;
>>>>>>> 7936303... Stuff
}

const MapComponent: React.FC<Props> = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const options = {
<<<<<<< HEAD
      view: new View({zoom, center}),
>>>>>>> 3452ce2... Lint stuff
      layers:   [],
=======
      view: new View({ zoom, center }),
      layers: [],
>>>>>>> 7936303... Stuff
      controls: [],
      overlays: [],
    };

    const mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

<<<<<<< HEAD
  // zoom change handler
=======
>>>>>>> 3452ce2... Lint stuff
  useEffect(() => {
    map?.getView()?.setZoom(zoom);
  }, [map, zoom]);

  useEffect(() => {
    map?.getView()?.setCenter(center);
  }, [map, center]);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <MapContext.Provider value={{ map }}>
      <MapContainer ref={mapRef} className="ol-map">
=======
    <MapContext.Provider value={{map}}>
      <MapContainer ref={mapRef}>
>>>>>>> 3452ce2... Lint stuff
        {children}
      </MapContainer>
=======
    <MapContext.Provider value={{ map }}>
      <MapContainer ref={mapRef}>{children}</MapContainer>
>>>>>>> 7936303... Stuff
    </MapContext.Provider>
  );
};

const MapContainer = styled.div`
  min-width: 600px;
  min-height: 500px;
  margin: 50px;
  height: 500px;
  width: '100%';
`;

export default MapComponent;
