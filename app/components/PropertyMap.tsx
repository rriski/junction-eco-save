import styled from 'styled-components';

import { dummieProperty } from 'app/utils/dummies';
import DetailsCard from 'components/DetailsCard';

const PropertyMap = () => {

  return (
    <Wrapper>
      <Map />

      <Details>
        <DetailsCard {...dummieProperty} />
      </Details>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  padding-right: ${p => p.theme.spacing.large};
`

const Map = styled.div`
  width: 100%;
  height: ${p => p.theme.rem(600)};
  background-color: ${p => p.theme.colors['grey-light']};
  border-radius: ${p => p.theme.borderRadius.large};
  box-shadow: ${p => p.theme.shadow.default};
`

const Details = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  max-width: ${p => p.theme.rem(500)};
`

export default PropertyMap;