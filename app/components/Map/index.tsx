import { useState, useEffect, useRef } from 'react';

import { GeoJSON, WFS } from 'ol/format';
import { like as likeFilter } from 'ol/format/filter';
import OLVectorLayer from 'ol/layer/Vector';
import { Pixel } from 'ol/pixel';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import { Controls, FullScreenControl } from 'app/components/Map/Controls';
import { Layers, TileLayer, VectorLayer } from 'app/components/Map/Layers';
import mapStyles from 'app/components/Map/MapStyles';
import { OSMSource } from 'app/components/Map/Source';
import MapComponent from 'components/Map/MapComponent';

interface Props {
  setBuildingId: (buildingId?: string) => void;
}

const Map = ({ setBuildingId }: Props) => {
  const [center, setCenter] = useState([24.946, 60.166]);
  const [zoom, setZoom] = useState(16);
  const [showLayer1, setShowLayer1] = useState(false);
  const [vectorSource, setVectorSource] = useState<VectorSource | undefined>(undefined);

  const vectorLayerRef = useRef<OLVectorLayer>(null);

  useEffect(() => {
    const vectorSource = new VectorSource();

    // @ts-ignore
    const featureRequest = new WFS().writeGetFeature({
      srsName: 'EPSG:3857',
      featureTypes: ['avoindata:Kiinteisto_alue'],
      outputFormat: 'application/json',
      filter: likeFilter('kiinteisto', '91-4-61*'),
    });

    fetch('https://kartta.hel.fi/ws/geoserver/avoindata/wfs', {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest),
    }).then(async (response) => {
      const json = await response.json();
      const features = new GeoJSON().readFeatures(json);
      vectorSource.addFeatures(features);
    });

    setVectorSource(vectorSource);
    setShowLayer1(true);
  }, []);

  const handleSelect = (pixel: Pixel) => {
    if (vectorLayerRef.current) {
      vectorLayerRef.current.getFeatures(pixel).then((value: any) => {
        if (value && value.length) {
          setBuildingId(value[0].values_.kiinteisto);
        } else {
          setBuildingId(undefined);
        }
      });
    }
  };

  return (
    <MapComponent onClick={handleSelect} center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer source={OSMSource()} zIndex={0} />

        {showLayer1 && (
          <VectorLayer ref={vectorLayerRef} source={vectorSource} style={mapStyles.Polygon} />
        )}
      </Layers>

      <Controls>
        <FullScreenControl />
      </Controls>
    </MapComponent>
  );
};

export default Map;
