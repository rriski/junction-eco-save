import React from 'react';

import { Link, useQuery } from 'blitz';
import styled from 'styled-components';

import getBuildings from 'app/buildings/queries/getBuildings';

interface Props {
  query: string;
}

const SearchResults = ({ query }: Props) => {
  const [buildings] = useQuery(getBuildings, {
    where: { location_street_address: { contains: query } },
    take: 5,
  });

  return (
    <Results>
      {buildings.buildings.map(({ id, location_street_address }) => (
        <SearchResult key={id}>
          <Link href="/properties/[id]" as={`/properties/${id}`}>
            <a>{location_street_address}</a>
          </Link>
        </SearchResult>
      ))}
    </Results>
  );
};

const Results = styled.ul`
  list-style: none;
  overflow: hidden;
  margin: 9px 0 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
`;

const SearchResult = styled.li`
  background: #0070f3;
  color: #eee;
  margin: 0 0 9px;
  padding: 18px;
`;

export default SearchResults;
