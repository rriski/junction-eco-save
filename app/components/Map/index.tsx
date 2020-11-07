import { useState, useEffect } from 'react';

import { useQuery } from 'blitz';
import { GeoJSON, WFS } from 'ol/format';
import { like as likeFilter } from 'ol/format/filter';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

import getBuilding from 'app/buildings/queries/getBuilding';
import { Controls, FullScreenControl } from 'app/components/Map/Controls';
import { Layers, TileLayer, VectorLayer } from 'app/components/Map/Layers';
import mapStyles from 'app/components/Map/MapStyles';
import { OSMSource } from 'app/components/Map/Source';
import MapComponent from 'components/Map/MapComponent';

const Map = () => {
  const [center, setCenter] = useState([24.945831, 60.192059]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(false);

  const vectorSource = new VectorSource();

  const building = useQuery(getBuilding, {
    where: { location_street_address: { contains: 'bulevardi', mode: 'insensitive' } },
  });
  console.log(building);

  const key = 'LdUm2NwwklDLVjfQM0Qr';
  const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  return (
    <MapComponent center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer source={OSMSource()} zIndex={0} />

        {showLayer1 && <VectorLayer source={vectorSource} style={mapStyles.Polygon} />}
      </Layers>

      <Controls>
        <FullScreenControl />
      </Controls>
    </MapComponent>
  );
};

export default Map;
