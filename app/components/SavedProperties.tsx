import styled from 'styled-components';

import PropertyCard from 'components/PropertyCard';
import { Building } from 'db';
import { Content } from 'styles/index';
import { Subtitle } from 'styles/typography';

interface Props {
  savedBuildings: Building[];
}

const SavedProperties = ({ savedBuildings }: Props) => (
  <Content spacing="xxlarge">
    <Subtitle>Saved properties</Subtitle>

    <Grid>
      {savedBuildings.map((building: Building) => (
        <PropertyCard key={building.id} building={building} />
      ))}
    </Grid>
  </Content>
);

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.theme.spacing.default};
  grid-template-columns: repeat(auto-fit, minmax(${(p) => p.theme.rem(200)}, 1fr));
`;

export default SavedProperties;
