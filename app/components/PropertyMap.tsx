import styled from 'styled-components';

import { dummieProperty } from 'app/utils/dummies';
import DetailsCard from 'components/DetailsCard';
import MapComponent from 'components/Map';
import { Content } from 'styles/index';

const PropertyMap = () => {
  return (
    <Wrapper>
      <Map />

      <Details>
        <DetailsCard {...dummieProperty} />
      </Details>
    </Wrapper>
  );
};
const Wrapper = styled(Content)`
  padding-right: ${(p) => p.theme.spacing.large};
`;

const Map = styled(MapComponent)`
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
