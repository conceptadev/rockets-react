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
import Clear from '@mui/icons-material/Clear';

const SearchIcon = () => (
  <MuiSearchIcon
    sx={{
      color: 'grey.400',
    }}
  />
);

/**
 * SearchField component props.
 */
export type SearchFieldProps = {
  /** Position of the search icon */
  searchIconPlacement?: 'start' | 'end';
  /** Default value of the search field */
  defaultValue?: string;
  /** Debounce wait time in milliseconds */
  wait?: number;
  /** Handler for debounced search value changes */
  onDebouncedSearchChange?: (value: string) => void;
  /** Handler for clear action */
  onClear?: () => void;
} & TextFieldProps;

/**
 * The SearchField component is a custom text field with additional functionality
 * for debounced search input and clearable input field. It supports customization
 * of the search icon placement and integrates with Material-UI components.
 *
 * @see [Storybook - SearchField](https://storybook.rockets.tools/?path=/docs/searchfield)
 *
 * @example
 * ```tsx
 * <SearchField
 *   searchIconPlacement="start"
 *   defaultValue="Initial search"
 *   wait={300}
 *   onDebouncedSearchChange={(value) => console.log(value)}
 *   onClear={() => console.log('Cleared')}
 *   placeholder="Search something..."
 * />
 * ```
 *
 * @param props - SearchField component props
 */
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
