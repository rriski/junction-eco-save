import { useEffect, useRef, useState } from 'react';

import { GeoJSON, WFS } from 'ol/format';
import { equalTo } from 'ol/format/filter';
import Geometry from 'ol/geom/Geometry';
import { bbox } from 'ol/loadingstrategy';
import { Pixel } from 'ol/pixel';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import { ForwardRefProps } from './Layers/VectorLayer';

import { Layers, TileLayer, VectorLayer } from 'app/components/Map/Layers';
import mapStyles from 'app/components/Map/MapStyles';
import { OSMSource } from 'app/components/Map/Source';
import MapComponent from 'components/Map/MapComponent';

interface Props {
  setBuildingId: (buildingId?: string) => void;
  selectedBuildingId?: string;
  showData?: boolean;
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
    vector.clear(true);
    vector.addFeatures(features);
  });
};

const Map = ({ setBuildingId, selectedBuildingId, showData = false }: Props) => {
  const [drawBuildings, toggleDrawBuildings] = useState(false);
  const [vectorSource, setVectorSource] = useState<VectorSource>();
  const [selectedVectorSource, setSelectedVectorSource] = useState<VectorSource>();

  const vectorLayerRef = useRef<ForwardRefProps>(null);
  const selectedLayerRef = useRef<ForwardRefProps>(null);

  useEffect(() => {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          'https://kartta.hel.fi/ws/geoserver/avoindata/wfs?' +
          'request=GetFeature&typename=avoindata:Rakennukset_alue_rekisteritiedot&' +
          'outputFormat=application/json&srsname=EPSG:3857&' +
          'bbox=' +
          extent.join(',') +
          ',EPSG:3857'
        );
      },
      strategy: bbox,
    });
    setVectorSource(vectorSource);
  }, []);

  useEffect(() => {
    if (vectorSource?.getState() === 'ready') {
      toggleDrawBuildings(true);
    }
  }, [vectorSource?.getState()]);

  useEffect(() => {
    if (selectedBuildingId) {
      const source = new VectorSource();
      drawData(source, selectedBuildingId).then(() => {
        setSelectedVectorSource(source);

        if (
          source.getFeatures() &&
          source.getFeatures()[0] &&
          source.getFeatures()[0].getGeometry()
        ) {
          vectorLayerRef.current?.fitToMap(source.getFeatures()[0].getGeometry() as Geometry);
        }
      });
    }
  }, [selectedBuildingId, vectorLayerRef]);

  const handleSelect = (pixel: Pixel) => {
    if (vectorLayerRef.current) {
      vectorLayerRef.current.getFeatures(pixel).then((value: any) => {
        if (value && value.length) {
          setBuildingId(value[0].values_.c_kiinteistotunnus);

          const boi = value[0].getGeometry();
          if (boi) {
            vectorLayerRef.current?.fitToMap(boi);
          }
        } else {
          setBuildingId(undefined);
        }
      });
    }
  };

  return (
    <MapComponent onClick={handleSelect} center={fromLonLat([24.946, 60.166])} zoom={16}>
      <Layers>
        <TileLayer source={OSMSource()} zIndex={0} />

        {selectedVectorSource && (
          <VectorLayer
            ref={selectedLayerRef}
            source={selectedVectorSource}
            style={mapStyles.HighlightedBuilding}
            centerOnChange
          />
        )}

        {drawBuildings && showData && (
          <VectorLayer ref={vectorLayerRef} source={vectorSource} style={mapStyles.Buildings} />
        )}
      </Layers>
    </MapComponent>
  );
};

export default Map;
