import styled from 'styled-components';

import { dummieProperty } from 'app/utils/dummies';
import PropertyCard from 'components/PropertyCard';
import { Content } from 'styles/index';
import { Subtitle } from 'styles/typography';
import { Property } from 'types/index';

const SavedProperties = () => {
  const properties = [1, 2, 3, 4, 5, 6, 7, 8].map(() => dummieProperty);

  return (
    <Content spacing="xxlarge">
      <Subtitle>Saved properties</Subtitle>

      <Grid>
        {properties.map((property: Property) => (
          <PropertyCard key={property.address} {...property} />
        ))}
      </Grid>
    </Content>
  );
};

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.theme.spacing.default};
  grid-template-columns: repeat(auto-fit, minmax(${(p) => p.theme.rem(200)}, 1fr));
`;

export default SavedProperties;
