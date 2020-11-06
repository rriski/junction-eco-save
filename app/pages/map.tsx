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


const GeoJSON = dynamic(() => import('ol/format/GeoJSON'), {
  ssr: false
});



const MapPage: BlitzPage = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
	const [zoom, setZoom] = useState(9);
	const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  
  var vectorSource = VectorSource({
    format: new GeoJSON(),
    url: function (extent) {
      return (
        'https://ahocevar.com/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
        'outputFormat=application/json&srsname=EPSG:3857&' +
        'bbox=' +
        extent.join(',') +
        ',EPSG:3857'
      );
    },
    strategy: bboxStrategy,
  });

  
  return (
    <Suspense fallback="Loading...">
    <Map center={fromLonLat(center)} zoom={zoom}>
    <Layers>
      <TileLayer
        source={OSMSource()}
        zIndex={0}
      />
      {showLayer1 && (
        <VectorLayer
          source={vectorSource}
          style={mapStyles.MultiPolygon}
        />
      )}
      {showLayer2 && (
        <VectorLayer
          source={vectorSource}
          style={mapStyles.MultiPolygon}
        />
      )}
    </Layers>
    <Controls>
      <FullScreenControl />
    </Controls>
    </Map>
  </Suspense>
  )
}

MapPage.getLayout = (page) => <Layout title="Map">{page}</Layout>

export default MapPage
