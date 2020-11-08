import { useCallback } from 'react';

import { useQuery } from 'blitz';
import styled from 'styled-components';
import { Spacer, Stack } from 'styled-layout';

import getBuilding from 'app/buildings/queries/getBuilding';
import { getImprovable, getLatestRenovation } from 'app/utils/buildingScores';
import { formatBuildingId } from 'app/utils/format';
import { addBuildingToLocalStorage, removeBuildingFromLocalStorage } from 'app/utils/localStorage';
import { AdvancedFucker } from 'components/Fucker';
import Perkele from 'components/Perkele';
import { Building } from 'db';
import SaveIcon from 'static/svg/save.svg';
import { ButtonLink, Card, DetailGrid } from 'styles/index';
import { Subtitle, Text } from 'styles/typography';

interface Props {
  buildingId: string | undefined;
  savedBuildings: Building[];
  setSavedBuildings: (buildings: Building[]) => void;
}

const DetailsCard = ({ buildingId, savedBuildings, setSavedBuildings }: Props) => {
  const [building] = useQuery(getBuilding, {
    where: { building_id: formatBuildingId(buildingId) },
  });
  const isSaved = savedBuildings.some((b) => b.building_id === buildingId);

  const improvable = getImprovable(building);
  const latestRenovation = Math.min(getLatestRenovation(building), new Date().getFullYear());

  console.log(building);

  const onSaveClick = useCallback(() => {
    if (building) {
      if (!isSaved) {
        const newSavedBuildings = addBuildingToLocalStorage(building);
        setSavedBuildings(newSavedBuildings);
      } else {
        const newSavedBuildings = removeBuildingFromLocalStorage(building);
        setSavedBuildings(newSavedBuildings);
      }
    }
  }, [building, isSaved]);

  return (
    <Wrapper>
      <Perkele>
        {building && (
          <Card spacing="medium">
            <Stack axis="x" justify="space-between" align="center">
              <Subtitle>
                {building.location_street_address} {building.location_street_number}
              </Subtitle>

              <SaveButton onClick={onSaveClick} selected={isSaved} />
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
            title="Energy consumption"
            value={building.energy_consumption.electricity + building.energy_consumption.heating}
            thresholds={{ low: 5000, high: 100000 }}
            inverse
            unit="kW"
          />
        )}

        {building && <ButtonLink href={`/buildings/${building.id}`}>Read more</ButtonLink>}
      </Perkele>
    </Wrapper>
  );
};

const Wrapper = styled(Stack)`
  width: ${(p) => p.theme.rem(450)};
  padding: ${(p) => p.theme.spacing.default};
`;

const SaveButton = styled(SaveIcon)<{ selected: boolean }>`
  color: ${(p) => p.theme.colors[p.selected ? 'red' : 'grey']};
  cursor: pointer;
  fill: ${(p) => (p.selected ? p.theme.colors.red : 'transparent')};
  transition: color 0.1s, fill 0.1s;
`;

export default DetailsCard;
