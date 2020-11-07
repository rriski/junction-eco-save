import { Suspense, useState } from 'react';

import dynamic from 'next/dynamic';
import { GeoJSON, WFS } from 'ol/format';
import { like as likeFilter } from 'ol/format/filter';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import { Controls, FullScreenControl } from 'app/components/Map/Controls';
import { Layers, TileLayer, VectorLayer } from 'app/components/Map/Layers';
import mapStyles from 'app/components/Map/MapStyles';
import { OSMSource } from 'app/components/Map/Source';
import Layout from 'app/layouts/Layout';
import MapComponent from 'components/Map/MapComponent';

const Map = () => {
  const [center, setCenter] = useState([24.945831, 60.192059]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  const vectorSource = new VectorSource();

  const featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureTypes: ['avoindata:Kiinteisto_alue'],
    outputFormat: 'application/json',
    filter: likeFilter('kiinteisto', '91-4-61*'),
    featureNS: 'https://kartta.hel.fi/',
    featurePrefix: '',
  });

  fetch('https://kartta.hel.fi/ws/geoserver/avoindata/wfs', {
    method: 'POST',
    body: new XMLSerializer().serializeToString(featureRequest),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const features = new GeoJSON().readFeatures(json);
      vectorSource.addFeatures(features);
    });

  const key = 'LdUm2NwwklDLVjfQM0Qr';
  const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  return (
    <Suspense fallback="Loading...">
      <MapComponent center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={OSMSource()} zIndex={0} />

          {showLayer1 && <VectorLayer source={vectorSource} style={mapStyles.Polygon} />}
        </Layers>

        <Controls />

        <Controls>
          <FullScreenControl />
        </Controls>
      </MapComponent>
    </Suspense>
  );
};
