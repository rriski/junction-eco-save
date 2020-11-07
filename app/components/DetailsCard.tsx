import { useState } from 'react';

import styled from 'styled-components';
import { Spacer, Stack } from 'styled-layout';

import Fucker from 'components/Fucker';
import Perkele from 'components/Perkele';
import { Building } from 'db';
import SaveIcon from 'static/svg/save.svg';
import { Card, DetailGrid, ButtonLink } from 'styles/index';
import { Subtitle, Text } from 'styles/typography';

interface Props {
  building: Building | null;
}

const DetailsCard = ({ building }: Props) => {
  const [saved, toggleSaved] = useState(false);

  return (
    <Wrapper>
      <Perkele shouldOpen={!!building}>
        {building && (
          <Card spacing="medium">
            <Stack axis="x" justify="space-between" align="center">
              <Subtitle>
                {building.location_street_address} {building.location_street_number}
              </Subtitle>

              <SaveButton onClick={() => toggleSaved((x) => !x)} selected={saved} />
            </Stack>

            <Text>Helsinki, {building.location_post_number}</Text>

            <Spacer size="small" />

            <DetailGrid>
              <Text>Potential</Text>
              <Text weight="bold" align="right">
                {building.ecosave} %
              </Text>

              <Text>Renovated</Text>
              <Text weight="bold" align="right">
                {building.lastRenovation}
              </Text>
            </DetailGrid>
          </Card>
        )}

        {building && <Fucker indicator={20} category="Energy consumption" kpi="2000 kW" />}

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
