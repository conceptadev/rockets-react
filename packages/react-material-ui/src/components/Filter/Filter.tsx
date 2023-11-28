'use client';

import React from 'react';
import { Grid, GridProps } from '@mui/material';

import SearchField from '../../components/SearchField';
import AutocompleteField from '../../components/AutocompleteField';
import SelectField from '../../components/SelectField';
import {
  SelectFieldProps,
  SelectOption,
  allOption,
} from '../../components/SelectField/SelectField';
import { SearchFieldProps } from '../../components/SearchField/SearchField';

export enum FilterType {
  Text = 'text',
  Autocomplete = 'autocomplete',
  Select = 'select',
}

type FilterCommon = {
  isLoading?: boolean;
  columns?: number;
  size?: SearchFieldProps['size'] | SelectFieldProps['size'];
};

type TextFilter = {
  type: FilterType.Text;
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
} & FilterCommon;

type AutocompleteFilter = {
  type: FilterType.Autocomplete;
  options: SelectOption[];
  label?: string;
  currentValue?: string;
  defaultValue?: SelectOption;
  onChange: (value: string | null) => void;
} & FilterCommon;

type SelectFilter = {
  type: FilterType.Select;
  options: SelectOption[];
  label: string;
  defaultValue?: string;
  size?: SelectFieldProps['size'];
  onChange: (value: string | null) => void;
} & FilterCommon;

export type Filter = TextFilter | AutocompleteFilter | SelectFilter;

const renderComponent = (filter: Filter) => {
  switch (filter.type) {
    case 'autocomplete':
      return (
        <AutocompleteField
          key={filter?.defaultValue?.value}
          fullWidth
          size={filter.size ?? 'small'}
          options={filter.options}
          isLoading={filter.isLoading}
          onChange={filter.onChange}
          currentValue={filter.currentValue}
          defaultValue={filter.defaultValue ?? allOption}
        />
      );

    case 'select':
      return (
        <SelectField
          fullWidth
          size={filter.size ?? 'small'}
          label={filter.label}
          isLoading={filter.isLoading}
          options={filter.options}
          defaultValue={filter.defaultValue}
          onChange={filter.onChange}
        />
      );

    case 'text':
      return (
        <SearchField
          fullWidth
          placeholder={filter.placeholder}
          size={filter.size ?? 'small'}
          defaultValue={filter.defaultValue}
          onDebouncedSearchChange={filter.onChange}
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

  return (
    <Grid container gap={2} {...rest}>
      {filters.map((filter, index) => (
        <Grid key={`filter-${index}`} item xs={12} md={filter.columns || 12}>
          {renderComponent(filter)}
        </Grid>
      ))}
    </Grid>
  );
};

export default Filter;
