import React from 'react';

import { Link, useQuery } from 'blitz';
import styled from 'styled-components';

import getBuildings from 'app/buildings/queries/getBuildings';
import Spinner from 'components/Loaders/Spinner';

interface Props {
  query: string;
}

const SearchResults = ({ query }: Props) => {
  const [buildings, { isLoading }] = useQuery(getBuildings, {
    where: { location_street_address: { contains: query } },
    take: 5,
  });

  return (
    <>
      <Results>
        {buildings.buildings.map(({ id, location_street_address }) => (
          <SearchResult key={id}>
            <Link href="/properties/[id]" as={`/properties/${id}`}>
              <a>{location_street_address}</a>
            </Link>
          </SearchResult>
        ))}
      </Results>
      <SearchMarker>{isLoading && <Spinner />}</SearchMarker>
    </>
  );
};

const SearchMarker = styled.div`
  position: relative;
  top: 0;
  right: ${(p) => p.theme.spacing.large};
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${(p) => p.theme.colors['grey-dark']};
  font-size: 22px;
  pointer-events: none;
`;

const Results = styled.ul`
  position: absolute;
  z-index: 100;
  top: 100%;
  right: 0;
  left: 0;
  overflow: hidden;
  padding: 0;
  margin: 9px 0 0;
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadow.default};
  list-style: none;
`;

const SearchResult = styled.li`
  padding: ${(p) => p.theme.spacing.small};
  margin: 0 ${(p) => p.theme.spacing.large};
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors['grey-dark']};
`;

export default SearchResults;
