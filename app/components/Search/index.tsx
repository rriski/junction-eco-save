import { useCallback, useRef, useState, Suspense, SetStateAction, Dispatch } from 'react';

import styled from 'styled-components';

import SearchResults from './SearchResults';

import OutsideEventCatcher from 'components/OutsideEventCatcher';
import { Building } from 'db';
import { Content } from 'styles/index';

interface Props {
  setBuildingId: (buildingId: string) => void;
}

const Search = ({ setBuildingId }: Props) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
  }, []);

  const handleSelect = (building: Building) => {
    setQuery(
      `${building.location_street_address} ${building.location_street_number}, ${building.location_post_number} Helsinki`
    );
    setBuildingId(building.building_id);
  };

  return (
    <OutsideEventCatcher onOutsideEvent={() => setActive(false)}>
      <SearchContainer ref={searchRef}>
        <StyledSearch
          onChange={onChange}
          onFocus={() => setActive(true)}
          type="text"
          placeholder="Search estates"
          value={query}
        />

        <SearchLabel>Search estates</SearchLabel>

        <Suspense fallback="">
          {active && !!query.length && <SearchResults onSelect={handleSelect} query={query} />}
        </Suspense>
      </SearchContainer>
    </OutsideEventCatcher>
  );
};

const SearchContainer = styled.div`
  ${(p) => p.theme.typography.body}
  position: relative;
  width: 100%;
  max-width: ${(p) => p.theme.rem(800)};
  height: 62px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 999px;
  box-shadow: ${(p) => p.theme.shadow.default};
  color: ${(p) => p.theme.colors.grey};
  transition-property: opacity, filter, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:hover {
    box-shadow: ${(p) => p.theme.shadow.strong};
  }
`;

const StyledSearch = styled.input`
  position: absolute;
  z-index: 3;
  bottom: 0;
  display: block;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 0 ${(p) => p.theme.spacing.xlarge};
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
  color: ${(p) => p.theme.colors.black};
  font-size: 17px;

  &::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  &:focus,
  &:not(:placeholder-shown) {
    top: 17px;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    bottom: ${(p) => p.theme.rem(25)};
    font-size: 11px;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

const SearchLabel = styled.label`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0 ${(p) => p.theme.spacing.xlarge};
  border: 0;
  cursor: text;
  transition: all 0.2s ease-in-out;
`;

export default Search;
