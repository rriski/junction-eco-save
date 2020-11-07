import { Building } from '@prisma/client';
import { useQuery } from 'blitz';
import styled from 'styled-components';

import getBuildings from 'app/buildings/queries/getBuildings';
import Spinner from 'components/Loaders/Spinner';
import { ListButton } from 'styles/index';

interface Props {
  query: string;
  onSelect: (building: Building) => void;
}

const SearchResults = ({ query, onSelect }: Props) => {
  const [buildings, { isLoading }] = useQuery(getBuildings, {
    where: { location_street_address: { contains: query, mode: 'insensitive' } },
    take: 5,
  });

  return (
    <>
      <Results>
        {buildings.buildings.map((building) => (
          <SearchResult key={building.id}>
            <ListButton onClick={() => onSelect(building)}>
              {building.location_street_address} {building.location_street_number}
            </ListButton>
          </SearchResult>
        ))}
      </Results>

      <SearchMarker>{<Spinner />}</SearchMarker>
    </>
  );
};

const SearchMarker = styled.div`
  ${(p) => p.theme.typography.body}
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${(p) => p.theme.colors['grey-dark']};
  pointer-events: none;
`;

const Results = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;
  right: 0;
  left: 0;
  overflow: hidden;
  padding: 0;
  margin: ${(p) => p.theme.spacing.xsmall} 0 0;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius.default};
  box-shadow: ${(p) => p.theme.shadow.default};
  list-style: none;
`;

const SearchResult = styled.li`
  width: 100%;
`;

export default SearchResults;
