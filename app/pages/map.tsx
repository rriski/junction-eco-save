import { useState, Suspense } from "react";

import { BlitzPage } from "blitz";
import dynamic from 'next/dynamic';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import { fromLonLat, get } from 'ol/proj';

import Map from "app/components/Map";
import { Controls, FullScreenControl } from "app/components/Map/Controls";
import { Layers, TileLayer, VectorLayer } from "app/components/Map/Layers";
import { styles as mapStyles } from "app/components/Map/MapStyles"
import { OSMSource, XYZSource, VectorSource } from "app/components/Map/Source";
import Layout from "app/layouts/Layout";

const MapPage: BlitzPage = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
	const [zoom, setZoom] = useState(9);
	const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  return (
    <Suspense fallback="Loading...">
    <Map center={fromLonLat(center)} zoom={zoom}>
    <Layers>
      <TileLayer
        source={OSMSource()}
        zIndex={0}
      />
    </Layers>
    <Controls>
      <FullScreenControl />
    </Controls>
    </Map>
  </Suspense>
  )
}

MapPage.getLayout = (page) => <Layout title="Map">{page}</Layout>

export default dynamic(() => Promise.resolve(MapPage), {
  ssr: false,
});
