<<<<<<< HEAD
import { useRef, useState, useEffect, FC } from 'react'
=======
import {useRef, useState, useEffect} from 'react'
>>>>>>> 3452ce2... Lint stuff

import {View, Map} from 'ol';
import styled from 'styled-components'

import MapContext from './MapContext';

interface Props {
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
}

const MapComponent: React.FC<Props> = ({children, zoom, center}) => {
  const mapRef = useRef();
  const [map, setMap] = useState<Map>(null);

  useEffect(() => {
    const options = {
      view: new View({zoom, center}),
>>>>>>> 3452ce2... Lint stuff
      layers:   [],
      controls: [],
      overlays: []
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

  // center change handler
  useEffect(() => {

    map?.getView()?.setCenter(center)
  }, [map, center])

  return (
<<<<<<< HEAD
    <MapContext.Provider value={{ map }}>
      <MapContainer ref={mapRef} className="ol-map">
=======
    <MapContext.Provider value={{map}}>
      <MapContainer ref={mapRef}>
>>>>>>> 3452ce2... Lint stuff
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