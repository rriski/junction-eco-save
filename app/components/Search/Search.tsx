import { useCallback, useRef, useState, Suspense } from 'react';

import styled from 'styled-components';

import SearchResults from './SearchResults';

import { CONTENT_WIDTH } from 'app/utils/constants';

const Search = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
  }, []);

  return (
    <SearchContainer ref={searchRef}>
      <StyledSearch
        onChange={onChange}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        type="text"
        placeholder="Search estates"
        value={query}
      />
      <SearchLabel>Search estates</SearchLabel>
      <SearchMarker>!</SearchMarker>
      <Suspense fallback="Loading results...">{active && <SearchResults query={query} />}</Suspense>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  ${(p) => p.theme.typography.action};
  margin: 0 auto;
  max-width: ${CONTENT_WIDTH};
  position: relative;
  display: block;
  height: 62px;
  border: 0;
  background-color: #ffffff;
  border-bottom-left-radius: ${(p) => p.theme.borderRadius.large};
  border-bottom-right-radius: ${(p) => p.theme.borderRadius.large};
  border-top-left-radius: ${(p) => p.theme.borderRadius.large};
  border-top-right-radius: 0;
  box-shadow: ${(p) => p.theme.shadow.default};
  margin-bottom: ${(p) => p.theme.spacing.small};
  position: relative;
  color: ${(p) => p.theme.colors.grey};
  transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out, box-shadow 0.1s ease-in-out;

  &:hover {
    box-shadow: ${(p) => p.theme.shadow.strong};
  }
`;

const StyledSearch = styled.input`
  position: absolute;
  border: 0;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0);
  top: 0;
  height: 45px;
  width: 100%;
  padding: 0 ${(p) => p.theme.spacing.xlarge};
  box-sizing: border-box;
  z-index: 3;
  display: block;
  color: ${(p) => p.theme.colors['teal']};
  font-size: 17px;
  transition: top 0.1s ease-in-out;

  &::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  &:focus,
  &:not(:placeholder-shown) {
    top: 17px;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    bottom: 20px;
    font-size: 13px;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

const SearchLabel = styled.label`
  position: absolute;
  border: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 ${(p) => p.theme.spacing.xlarge};
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  cursor: text;
`;

const SearchMarker = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  right: ${(p) => p.theme.spacing.large};
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;
  color: #e0e0e0;
`;

export default Search;
