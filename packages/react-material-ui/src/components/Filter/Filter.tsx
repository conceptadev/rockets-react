'use client';

import React, { useState } from 'react';
import { Box, Grid, GridProps } from '@mui/material';

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

export enum FilterType {
  Text = 'text',
  Autocomplete = 'autocomplete',
  Select = 'select',
}

type FilterCommon = {
  id: string;
  label: string;
  isLoading?: boolean;
  columns?: number;
  size?: SearchFieldProps['size'] | SelectFieldProps['size'];
  showOnMount?: boolean;
  hide?: boolean;
};

type TextFilter = {
  type: FilterType.Text;
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onDebouncedSearchChange?: (value: string) => void;
  value?: string;
} & FilterCommon;

type AutocompleteFilter = {
  type: FilterType.Autocomplete;
  options: SelectOption[];
  currentValue?: string;
  defaultValue?: SelectOption;
  onChange: (value: string | null) => void;
} & FilterCommon;

type SelectFilter = {
  type: FilterType.Select;
  options: SelectOption[];
  defaultValue?: string;
  size?: SelectFieldProps['size'];
  onChange: (value: string | null) => void;
  value?: string | null;
} & FilterCommon;

export type Filter = TextFilter | AutocompleteFilter | SelectFilter;

const renderComponent = (filter: Filter) => {
  switch (filter.type) {
    case 'autocomplete': {
      return (
        <AutocompleteField
          key={filter?.defaultValue?.value}
          fullWidth
          size={filter.size ?? 'small'}
          options={filter.options}
          isLoading={filter.isLoading}
          onChange={filter.onChange}
          currentValue={filter.currentValue || ''}
          defaultValue={filter.defaultValue ?? allOption}
          label={filter.label}
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
  filters: Filter[];
} & GridProps;

const Filter = (props: FilterProps) => {
  const { filters, ...rest } = props;

  const [filterOrder, setFilterOrder] = useState<ListItem[]>(
    filters.map((filter) => ({ id: filter.id, label: filter.label })),
  );

  return (
    <Box display="flex" width="100%">
      <Grid container spacing={2} {...rest}>
        {filterOrder.map((filter, index) => {
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
              key={`filter-${index}`}
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
        <OrderableDropDown list={filterOrder} setList={setFilterOrder} />
      </Box>
    </Box>
  );
};

export default Filter;
