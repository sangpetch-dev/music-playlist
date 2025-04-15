import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Clear } from '@mui/icons-material';


interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for songs, artists, or albums',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit}>
        <SearchInputContainer>
          <Search />
          <StyledInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
          />
          {query && (
            <IconButton type="button" onClick={handleClear}>
              <Clear fontSize="small" />
            </IconButton>
          )}
          <IconButton type="submit">
            <Search fontSize="small" />
          </IconButton>
        </SearchInputContainer>
      </form>
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff1a;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  &:focus-within {
    box-shadow: 0 0 0 2px #ffffff33;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  margin-left: 0.5rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b3b3b3;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 0.5rem;
  &:hover {
    color: white;
  }
`;