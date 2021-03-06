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
  coordinates?: number[];
}

const PropertyMap = (props: Props) => {
  const [buildingId, setBuildingId] = useState<string>();

  return (
    <Content>
      <Search setBuildingId={setBuildingId} />

      <Wrapper>
        <Map
          selectedBuildingId={buildingId}
          setBuildingId={setBuildingId}
          coordinates={props.coordinates}
          showData
        />

        <Suspense fallback="">
          <Details>
            <DetailsCard buildingId={buildingId} {...props} />
          </Details>
        </Suspense>
      </Wrapper>
    </Content>
  );
};

const Wrapper = styled.div`
  z-index: -1;
  padding-right: ${(p) => p.theme.spacing.large};

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
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
  display: flex;
  width: 100%;
  max-width: ${(p) => p.theme.rem(500)};
  flex-direction: column;
  align-items: flex-end;

  @media only screen and (max-width: 600px) {
    position: relative;
    padding: ${(p) => p.theme.spacing.default};
    margin-top: -${(p) => p.theme.spacing.large};
  }
`;

export default PropertyMap;
