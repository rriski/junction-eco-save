import ContentLoader from 'react-content-loader';

import { MapContainer } from 'components/Map/MapComponent';

const MapLoader = () => (
  <MapContainer>
    <ContentLoader viewBox="0 0 100 100">
      <rect width="300" height="600" />
    </ContentLoader>
  </MapContainer>
);

export default MapLoader;
