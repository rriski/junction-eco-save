import { Link } from 'blitz';
import styled from 'styled-components';

import { Building, Renovation } from 'db';
import { Card, DetailGrid } from 'styles/index';
import { Text, Subtitle, Detail } from 'styles/typography';

interface Props {
  building: Building;
}

function getLatestRenovation(renovations: Renovation[]) {
  if (renovations.length > 0) {
    return renovations.reduce((a, b) => {
      return a.end_year > b.end_year && a.end_year < new Date().getFullYear() ? a : b;
    });
  }
}

const PropertyCard = ({ building }: Props) => {
  const latestRenovation = getLatestRenovation((building as any).Renovation);

  return (
    <Card>
      <Subtitle>
        <Link href={`/buildings/${building.id}`}>
          <a>
            {building.location_street_address} {building.location_street_number}
          </a>
        </Link>
      </Subtitle>

      <Detail>Helsinki, {building.location_post_number}</Detail>

      <Divider />

      <DetailGrid>
        <Detail>Potential</Detail>
        <Text align="right">10 %</Text>

        <Detail>Renovated</Detail>
        {latestRenovation && <Text align="right">{latestRenovation.end_year}</Text>}
      </DetailGrid>
    </Card>
  );
};

const Divider = styled.div`
  width: 80%;
  height: ${(p) => p.theme.rem(1.5)};
  margin: ${(p) => p.theme.spacing.default} 0;
  background-color: ${(p) => p.theme.colors['grey-light']};
`;

export default PropertyCard;
