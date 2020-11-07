import { useState } from 'react';

import styled from 'styled-components';
import { Spacer, Stack } from 'styled-layout';

import Fucker from 'components/Fucker';
import { Card, DetailGrid } from 'styles/index';
import { Subtitle, Text } from 'styles/typography';
import SaveIcon from 'svg/save.svg';
import { Property } from 'types/index';

const DetailsCard = (property: Property) => {
  const [saved, toggleSaved] = useState(false);

  return (
    <Wrapper>
      <Card spacing="medium">
        <Stack axis="x" justify="space-between" align="center">
          <Subtitle>{property.address}</Subtitle>

          <SaveButton onClick={() => toggleSaved((x) => !x)} selected={saved} />
        </Stack>

        <Text>
          {property.postalCode}, {property.city}
        </Text>

        <Spacer size="small" />

        <DetailGrid>
          <Text>Potential</Text>
          <Text weight="bold" align="right">
            {property.ecosave} %
          </Text>

          <Text>Renovated</Text>
          <Text weight="bold" align="right">
            {property.lastRenovation}
          </Text>
        </DetailGrid>
      </Card>

      <Fucker indicator={20} category="Energy consumption" kpi="2000 kW" />

      <Fucker indicator={20} category="Energy consumption" kpi="2000 kW" />
    </Wrapper>
  );
};

const Wrapper = styled(Stack)`
  width: ${(p) => p.theme.rem(450)};
  padding: ${(p) => p.theme.spacing.default};
`;

const SaveButton = styled(SaveIcon)<{ selected: boolean }>`
  fill: ${(p) => (p.selected ? p.theme.colors.red : 'transparent')};
  color: ${(p) => p.theme.colors[p.selected ? 'red' : 'grey']};
  cursor: pointer;
  transition: color 0.1s, fill 0.1s;
`;

export default DetailsCard;
