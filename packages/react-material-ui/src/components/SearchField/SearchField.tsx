'use client';

import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import MuiSearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Clear } from '@mui/icons-material';

const SearchIcon = () => (
  <MuiSearchIcon
    sx={{
      color: 'grey.400',
    }}
  />
);

export type SearchFieldProps = {
  searchIconPlacement?: 'start' | 'end';
  defaultValue?: string;
  wait?: number;
  onDebouncedSearchChange: (searchTerm: string) => void;
} & TextFieldProps;

const SearchField = ({
  searchIconPlacement = 'end',
  defaultValue = '',
  wait = 500,
  onDebouncedSearchChange,
  ...props
}: SearchFieldProps) => {
  const [search, setSearch] = useState<string>(defaultValue);

  const handleDebouncedSearch = useMemo(
    () => debounce(onDebouncedSearchChange, wait),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  useEffect(() => {
    handleDebouncedSearch(search);
  }, [search]);

  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      onChange={handleChange}
      value={search}
      InputProps={{
        ...(searchIconPlacement === 'start' && {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              sx={{
                mr: 0.5,
                visibility: search ? 'visible' : 'hidden',
              }}
              aria-label="clear search"
              onClick={() => setSearch('')}
            >
              <Clear fontSize="small" />
            </IconButton>
            {searchIconPlacement === 'end' && <SearchIcon />}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default SearchField;
