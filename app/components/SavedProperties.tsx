import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { getSavedBuildings } from 'app/utils/localStorage';
import PropertyCard from 'components/PropertyCard';
import { Building } from 'db';
import { Content } from 'styles/index';
import { Subtitle } from 'styles/typography';

const SavedProperties = () => {
  const [properties, setProperties] = useState<Building[]>([]);

  useEffect(() => {
    const savedProperties = getSavedBuildings();
    if (savedProperties) {
      setProperties(savedProperties);
    }
  }, []);

  return (
    <Content spacing="xxlarge">
      <Subtitle>Saved properties</Subtitle>

      <Grid>
        {properties.map((building: Building) => (
          <PropertyCard key={building.id} building={building} />
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
