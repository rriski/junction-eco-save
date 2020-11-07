import { useState } from 'react';

import { useQuery, dynamic } from 'blitz';
import styled from 'styled-components';

import getBuilding from 'app/buildings/queries/getBuilding';
import { formatBuildingId } from 'app/utils/format';
import DetailsCard from 'components/DetailsCard';
import MapLoader from 'components/Map/MapLoader';
import Search from 'components/Search';
import { Building } from 'db';
import { Content } from 'styles/index';

const MapComponent = dynamic(() => import('components/Map'), {
  loading: () => <MapLoader />,
  ssr: false,
});

const PropertyMap = () => {
  const [buildingId, setBuildingId] = useState<string>();

  const [building] = useQuery(getBuilding, {
    where: { building_id: buildingId ? formatBuildingId(buildingId) : '' },
  });

  const onSelect = (building: Building) => {
    setBuildingId(building.building_id);
  };

  return (
    <Content>
      <Search onSelect={onSelect} />

      <Wrapper>
        <Map setBuildingId={setBuildingId} />

        <Details>
          <DetailsCard building={building} />
        </Details>
      </Wrapper>
    </Content>
  );
};

const Wrapper = styled(Content)`
  padding-right: ${(p) => p.theme.spacing.large};
  z-index: -1;
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
