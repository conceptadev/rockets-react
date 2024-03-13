'use client';

import React, { useState } from 'react';
import { Box, Grid, GridProps } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

import SearchField from '../../components/SearchField';
import AutocompleteField from '../../components/AutocompleteField';
import SelectField from '../../components/SelectField';
import {
  SelectFieldProps,
  SelectOption,
  allOption,
} from '../../components/SelectField/SelectField';
import { SearchFieldProps } from '../../components/SearchField/SearchField';
import OrderableDropDown, { ListItem } from '../OrderableDropDown';

export type FilterVariant = 'text' | 'autocomplete' | 'select';

export type FilterCommon = {
  id: string;
  label: string;
  isLoading?: boolean;
  columns?: number;
  size?: SearchFieldProps['size'] | SelectFieldProps['size'];
  showOnMount?: boolean;
  hide?: boolean;
};

type TextFilter = {
  type: 'text';
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onDebouncedSearchChange?: (value: string) => void;
  value?: string;
} & FilterCommon;

type AutocompleteFilter = {
  type: 'autocomplete';
  options: SelectOption[];
  resource?: string;
  resourceLabel?: string;
  resourceValue?: string;
  defaultValue?: SelectOption;
  onChange: (value: string | null) => void;
} & FilterCommon;

type SelectFilter = {
  type: 'select';
  options: SelectOption[];
  defaultValue?: string;
  size?: SelectFieldProps['size'];
  onChange: (value: string | null) => void;
  value?: string | null;
} & FilterCommon;

export type FilterType = TextFilter | AutocompleteFilter | SelectFilter;

const renderComponent = (filter: FilterType) => {
  switch (filter.type) {
    case 'autocomplete': {
      return (
        <AutocompleteField
          fullWidth
          size={filter.size ?? 'small'}
          options={filter.options}
          isLoading={filter.isLoading}
          onChange={filter.onChange}
          defaultValue={filter.defaultValue ?? allOption}
          label={filter.label}
          resource={filter.resource}
          resourceLabel={filter.resourceLabel}
          resourceValue={filter.resourceValue}
        />
      );
    }

    case 'select':
      return (
        <SelectField
          fullWidth
          size={filter.size ?? 'small'}
          label={filter.label}
          isLoading={filter.isLoading}
          options={filter.options}
          defaultValue={filter.defaultValue || ''}
          onChange={filter.onChange}
          value={filter.value}
          variant="outlined"
        />
      );

    case 'text':
      return (
        <SearchField
          fullWidth
          placeholder={filter.placeholder}
          size={filter.size ?? 'small'}
          defaultValue={filter.defaultValue}
          label={filter.label}
          value={filter.value}
          onChange={(e) => filter.onChange?.(e.target.value)}
          onDebouncedSearchChange={
            filter.onDebouncedSearchChange
              ? (value) => filter.onDebouncedSearchChange?.(value)
              : undefined
          }
        />
      );

    default:
      return <></>;
  }
};

export type FilterProps = {
  filters: FilterType[];
} & GridProps;

const Filter = (props: FilterProps) => {
  const { filters, ...rest } = props;

  const [filterOrder, setFilterOrder] = useState<ListItem[]>(
    filters.map((filter) => ({ id: filter.id, label: filter.label })),
  );

  return (
    <Box display="flex" width="100%">
      <Grid container spacing={2} {...rest}>
        {filterOrder.map((filter) => {
          const filterIndex = filters.findIndex((f) => f.id === filter.id);
          if (filterIndex === -1) {
            return null;
          }
          const currentFilter = filters[filterIndex];

          if (filter.hide) {
            return null;
          }

          return (
            <Grid
              key={`filter-${filter.id}`}
              item
              xs={12}
              md={currentFilter.columns || 12}
            >
              {renderComponent(currentFilter)}
            </Grid>
          );
        })}
      </Grid>
      <Box>
        <OrderableDropDown
          icon={<FilterAlt />}
          list={filterOrder}
          setList={setFilterOrder}
        />
      </Box>
    </Box>
  );
};

export default Filter;
