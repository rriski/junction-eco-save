import styled from 'styled-components';

import { Building } from 'db';
import { Card, DetailGrid } from 'styles/index';
import { Text, Subtitle, Detail } from 'styles/typography';

interface Props {
  building: Building;
}

const PropertyCard = ({ building }: Props) => (
  <Card>
    <Subtitle>{building.location_street_address}</Subtitle>

    <Detail>Helsinki, {building.location_post_number}</Detail>

    <Divider />

    <DetailGrid>
      <Detail>Potential</Detail>
      <Text align="right">10 %</Text>

      <Detail>Renovated</Detail>
      <Text align="right">2001</Text>
    </DetailGrid>
  </Card>
);

const Divider = styled.div`
  width: 80%;
  height: ${(p) => p.theme.rem(1.5)};
  margin: ${(p) => p.theme.spacing.default} 0;
  background-color: ${(p) => p.theme.colors['grey-light']};
`;

export default PropertyCard;
