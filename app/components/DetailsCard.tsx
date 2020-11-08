import { Link, useQuery } from 'blitz';
import styled from 'styled-components';
import { Spacer, Stack } from 'styled-layout';

import getBuilding from 'app/buildings/queries/getBuilding';
import { getImprovable, getLatestRenovation } from 'app/utils/buildingScores';
import { formatBuildingId } from 'app/utils/format';
import { AdvancedFucker } from 'components/Fucker';
import Perkele from 'components/Perkele';
import SaveBuilding from 'components/SaveBuilding';
import { Building } from 'db';
import { ButtonLink, Card, DetailGrid } from 'styles/index';
import { Subtitle, Text } from 'styles/typography';

interface Props {
  buildingId: string | undefined;
  savedBuildings: Building[];
  setSavedBuildings: (buildings: Building[]) => void;
}

const DetailsCard = (props: Props) => {
  const { buildingId } = props;
  const [building] = useQuery(getBuilding, {
    where: { building_id: formatBuildingId(buildingId) },
  });
  const improvable = getImprovable(building);
  const latestRenovation = Math.min(getLatestRenovation(building), new Date().getFullYear());

  return (
    <Wrapper>
      <Perkele>
        {building && (
          <Card spacing="medium">
            <Stack axis="x" justify="space-between" align="center">
              <Subtitle>
                {building.location_street_address} {building.location_street_number}
              </Subtitle>

              <SaveBuilding building={building} {...props} />
            </Stack>

            <Text>Helsinki, {building.location_post_number}</Text>

            <Spacer size="small" />

            <DetailGrid>
              {improvable && (
                <>
                  <Text>Potential</Text>
                  <Text weight="bold" align="right">
                    {improvable} %
                  </Text>
                </>
              )}

              {latestRenovation !== 0 && (
                <>
                  <Text>Renovated</Text>
                  <Text weight="bold" align="right">
                    {latestRenovation}
                  </Text>
                </>
              )}
            </DetailGrid>
          </Card>
        )}

        {building?.energy_consumption && (
          <AdvancedFucker
            type="electric"
            title="Energy consumption"
            value={building.energy_consumption.electricity + building.energy_consumption.heating}
            thresholds={{ low: 5000, high: 100000 }}
            inverse
            unit="kW"
          />
        )}

        {building && (
          <Link href={`/buildings/${building.id}`}>
            <ButtonLink>Read more</ButtonLink>
          </Link>
        )}
      </Perkele>
    </Wrapper>
  );
};

const Wrapper = styled(Stack)`
  width: ${(p) => p.theme.rem(450)};
  padding: ${(p) => p.theme.spacing.default};
`;

export default DetailsCard;
