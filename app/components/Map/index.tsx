import { useEffect, useRef, useState } from 'react';

import { GeoJSON, WFS } from 'ol/format';
import { equalTo, like as likeFilter } from 'ol/format/filter';
import OLVectorLayer from 'ol/layer/Vector';
import { Pixel } from 'ol/pixel';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import { Controls, FullScreenControl } from 'app/components/Map/Controls';
import { Layers, TileLayer, VectorLayer } from 'app/components/Map/Layers';
import mapStyles from 'app/components/Map/MapStyles';
import { OSMSource } from 'app/components/Map/Source';
import MapComponent from 'components/Map/MapComponent';
import { Building } from 'db';

interface Props {
  setBuildingId: (buildingId?: string) => void;
  selectedBuildingId?: string;
}

const drawData = async (vector: VectorSource, buildingId?: string) => {
  // @ts-ignore
  const featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureTypes: ['avoindata:Rakennukset_alue_rekisteritiedot'],
    outputFormat: 'application/json',
    filter: buildingId ? equalTo('c_kiinteistotunnus', buildingId) : undefined,
  });

  return fetch('https://kartta.hel.fi/ws/geoserver/avoindata/wfs', {
    method: 'POST',
    body: new XMLSerializer().serializeToString(featureRequest),
  }).then(async (response) => {
    const json = await response.json();
    const features = new GeoJSON().readFeatures(json);
    vector.addFeatures(features);
  });
};

const Map = ({ setBuildingId, selectedBuildingId }: Props) => {
  const [center, setCenter] = useState([24.946, 60.166]);
  const [zoom, setZoom] = useState(16);
  const [drawBuildings, toggleDrawBuildings] = useState(false);
  const [vectorSource, setVectorSource] = useState<VectorSource>();
  const [selectedVectorSource, setSelectedVectorSource] = useState<VectorSource>();

  const vectorLayerRef = useRef<OLVectorLayer>(null);

  useEffect(() => {
    const vectorSource = new VectorSource();
    setVectorSource(vectorSource);
    drawData(vectorSource).then(() => toggleDrawBuildings(true));
  }, []);

  useEffect(() => {
    if (selectedBuildingId) {
      const vector = new VectorSource();
      setSelectedVectorSource(vector);
    }
  }, [selectedBuildingId]);

  useEffect(() => {
    if (selectedVectorSource) {
      drawData(selectedVectorSource, selectedBuildingId);
    }
  }, [selectedVectorSource]);

  const handleSelect = (pixel: Pixel) => {
    if (vectorLayerRef.current) {
      vectorLayerRef.current.getFeatures(pixel).then((value: any) => {
        console.log(value);

        if (value && value.length) {
          setBuildingId(value[0].values_.c_kiinteistotunnus);
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

        {selectedVectorSource && (
          <VectorLayer source={selectedVectorSource} style={mapStyles.HighlightedBuilding} />
        )}

        {drawBuildings && (
          <VectorLayer ref={vectorLayerRef} source={vectorSource} style={mapStyles.Buildings} />
        )}
      </Layers>

      <Controls>
        <FullScreenControl />
      </Controls>
    </MapComponent>
  );
};

export default Map;
