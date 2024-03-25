'use client';

import React, { ReactNode, useState, useEffect } from 'react';
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
import { DatePickerProps } from '@mui/x-date-pickers';
import DatePickerField from '../../components/DatePickerField';

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

type DateFilter = {
  type: 'date';
  onChange: (value: Date | null) => void;
  onDebouncedSearchChange?: (value: Date) => void;
} & FilterCommon &
  DatePickerProps<Date>;

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

export type FilterType =
  | TextFilter
  | DateFilter
  | AutocompleteFilter
  | SelectFilter;

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

    case 'date':
      return (
        <DatePickerField
          sx={{
            width: '100%',
          }}
          label={filter.label}
          value={filter.value}
          onChange={filter.onChange}
          onDebouncedSearchChange={filter.onDebouncedSearchChange}
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
  children?: ReactNode;
  additionalGridItems?: {
    component: ReactNode;
    columns?: number;
  }[];
  complementaryActions?: ReactNode;
} & GridProps;

const Filter = (props: FilterProps) => {
  const { filters, ...rest } = props;

  const [filterOrder, setFilterOrder] = useState<ListItem[]>(
    filters.map((filter) => ({ id: filter.id, label: filter.label })),
  );

  useEffect(() => {
    const hiddenItems = filterOrder.filter((item) => item.hide);

    hiddenItems.forEach((item) => {
      const filterItem = filters.find((filter) => filter.id === item.id);

      if (filterItem && filterItem?.type === 'text' && filterItem?.onChange) {
        filterItem.onChange('');
      }

      if (
        filterItem &&
        filterItem?.type === 'text' &&
        filterItem?.onDebouncedSearchChange
      ) {
        filterItem.onDebouncedSearchChange('');
      }

      if (filterItem && filterItem?.type !== 'text' && filterItem?.onChange) {
        filterItem?.onChange(null);
      }
    });
  }, [filterOrder]);

  return (
    <Box
      display="flex"
      width="100%"
      alignItems="flex-start"
      justifyContent="space-between"
      gap={2}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
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
        {props.additionalGridItems
          ? props.additionalGridItems.map((node, index) => (
              <Grid
                key={`filter-complementary-${index}`}
                item
                xs={12}
                md={node.columns || 12}
              >
                {node.component}
              </Grid>
            ))
          : null}
      </Grid>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          width: { xs: '100%', md: 'auto' },
          justifyContent: { xs: 'end', md: 'unset' },
          gap: { xs: 4, md: 2 },
        }}
      >
        <OrderableDropDown
          icon={<FilterAlt />}
          list={filterOrder}
          setList={setFilterOrder}
        />
        {props.complementaryActions}
      </Box>
    </Box>
  );
};

export default Filter;
