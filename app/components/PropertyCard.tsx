import { Link } from 'blitz';
import styled from 'styled-components';

import { getImprovable, getLatestRenovation } from 'app/utils/buildingScores';
import { Building } from 'db';
import { Card, DetailGrid } from 'styles/index';
import { Text, Subtitle, Detail } from 'styles/typography';

interface Props {
  building: Building;
}

const PropertyCard = ({ building }: Props) => {
  const improvable = getImprovable(building);
  const latestRenovation = Math.min(getLatestRenovation(building), new Date().getFullYear());

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
        {improvable && (
          <>
            <Detail>Potential</Detail>
            <Text align="right">{improvable} %</Text>
          </>
        )}

        {latestRenovation !== 0 && (
          <>
            <Detail>Renovated</Detail>
            <Text align="right">{latestRenovation}</Text>
          </>
        )}
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
