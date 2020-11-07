import { useState, useEffect, useRef } from 'react';

import { useQuery } from 'blitz';
import { GeoJSON, WFS } from 'ol/format';
import { like as likeFilter } from 'ol/format/filter';
import { Pixel } from 'ol/pixel';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import getBuilding from 'app/buildings/queries/getBuilding';
import { Controls, FullScreenControl } from 'app/components/Map/Controls';
import { Layers, TileLayer, VectorLayer } from 'app/components/Map/Layers';
import mapStyles from 'app/components/Map/MapStyles';
import { OSMSource } from 'app/components/Map/Source';
import MapComponent from 'components/Map/MapComponent';
import { Building } from 'db';

interface Props {
  onSelect: (building: Building) => void;
}

const Map = ({ onSelect }: Props) => {
  const [center, setCenter] = useState([24.945831, 60.192059]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(false);
  const [vectorSource, setVectorSource] = useState<VectorSource | undefined>(undefined);

  const vectorLayerRef = useRef(null);

  const [selection, setSelection] = useState<Building>();

  const [building] = useQuery(getBuilding, {
    where: { location_street_address: selection?.location_street_address },
  });

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

  useEffect(() => {
    if (building) {
      console.log(selection, building);
    }
  }, [building, selection]);

  const handleSelect = (pixel: Pixel) => {
    if (vectorLayerRef.current) {
      vectorLayerRef.current.getFeatures(pixel).then((building: Building) => {
        setSelection(building);
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
