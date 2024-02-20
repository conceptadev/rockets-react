'use client';

import React, {
  useState,
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
} from 'react';
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
  onDebouncedSearchChange?: (value: string) => void;
  onClear?: () => void;
} & TextFieldProps;

const SearchField = ({
  searchIconPlacement = 'end',
  defaultValue = '',
  wait = 500,
  onDebouncedSearchChange,
  onClear,
  placeholder = 'Search',
  onChange,
  ...props
}: SearchFieldProps) => {
  const firstRender = useRef(true);
  const [search, setSearch] = useState<string>(defaultValue);

  const value = props.value ?? search;

  const handleDebouncedSearch =
    onDebouncedSearchChange &&
    useMemo(() => debounce(onDebouncedSearchChange, wait), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onChange?.(event);
  };

  useEffect(() => {
    // Keep track of the first render to avoid triggering onDebouncedSearchChange
    // on the initial render. Only trigger when the 'value' changes.
    if (!firstRender.current) {
      handleDebouncedSearch?.(value as string);
    } else {
      firstRender.current = false;
    }
    // Avoid adding handleDebouncedSearch to the dependency array
    // to prevent an infinite loop.
  }, [value]);

  const handleClear = () => {
    if (onClear) {
      return onClear();
    }
    setSearch('');
    // force the onChange event to be triggered with empty value
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <TextField
      placeholder={placeholder}
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
                visibility: value ? 'visible' : 'hidden',
              }}
              aria-label="clear search"
              onClick={handleClear}
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
