import {Suspense, useState} from 'react';

import {BlitzPage} from 'blitz';
import dynamic from 'next/dynamic';
import {GeoJSON} from 'ol/format';
import {bbox} from 'ol/loadingstrategy';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';

import Map from 'app/components/Map';
import {Controls, FullScreenControl} from 'app/components/Map/Controls';
import {Layers, TileLayer, VectorLayer} from 'app/components/Map/Layers';
import {OSMSource} from 'app/components/Map/Source';
import Layout from 'app/layouts/Layout';

const MapPage: BlitzPage = () => {
  const [center, setCenter] = useState([24.945831, 60.192059]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  const vectorSource = new VectorSource({
    format: new GeoJSON(),
    url: (extent: any) => {
      return (
        `${'https://kartta.hel.fi/ws/geoserver/avoindata/wfs?' +
        'version=1.1.0&request=GetFeature&typename=avoindata:Kiinteisto_alue&' +
        'outputFormat=application/json&srsname=EPSG:3857&' +
        'bbox='}${
          extent.join(',')
        },EPSG:3857`
      );
    },
    strategy: bbox,
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
              style={new Style({
                stroke: new Stroke({
                  color: 'rgba(0, 0, 255, 1.0)',
                  width: 1,
                }),
              })}
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

export default dynamic(() => Promise.resolve(MapPage), {
  ssr: false,
});
