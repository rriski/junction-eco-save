import styled from 'styled-components';

import { Card, DetailGrid } from 'styles/index';
import { Text, Subtitle, Detail } from 'styles/typography';
import { Property } from 'types/index';

const PropertyCard = (property: Property) => (
  <Card>
    <Subtitle>{property.address}</Subtitle>

    <Detail>
      {property.city}, {property.postalCode}
    </Detail>

    <Divider />

    <DetailGrid>
      <Detail>Potential</Detail>
      <Text align="right">{property.ecosave} %</Text>

      <Detail>Renovated</Detail>
      <Text align="right">{property.lastRenovation}</Text>
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
