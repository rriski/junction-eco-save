import { Suspense, useState } from 'react';

import { dynamic } from 'blitz';
import styled from 'styled-components';

import DetailsCard from 'components/DetailsCard';
import MapLoader from 'components/Map/MapLoader';
import Search from 'components/Search';
import { Building } from 'db';
import { Content } from 'styles/index';

const MapComponent = dynamic(() => import('components/Map'), {
  loading: () => <MapLoader />,
  ssr: false,
});

interface Props {
  savedBuildings: Building[];
  setSavedBuildings: (buildings: Building[]) => void;
}

const PropertyMap = (props: Props) => {
  const [buildingId, setBuildingId] = useState<string>();

  return (
    <Content>
      <Search setBuildingId={setBuildingId} />

      <Wrapper>
        <Map selectedBuildingId={buildingId} setBuildingId={setBuildingId} showData />

        <Suspense fallback="">
          <Details>
            <DetailsCard buildingId={buildingId} {...props} />
          </Details>
        </Suspense>
      </Wrapper>
    </Content>
  );
};

const Wrapper = styled(Content)`
  z-index: -1;
  padding-right: ${(p) => p.theme.spacing.large};
`;

export const Map = styled(MapComponent)`
  overflow: hidden;
  width: 100%;
  height: ${(p) => p.theme.rem(600)};
  background-color: ${(p) => p.theme.colors['grey-light']};
  border-radius: ${(p) => p.theme.borderRadius.large};
  box-shadow: ${(p) => p.theme.shadow.default};
`;

const Details = styled.div`
  position: absolute;
  right: 0;
  bottom: ${(p) => p.theme.spacing.large};
  max-width: ${(p) => p.theme.rem(500)};
`;

export default PropertyMap;
