import React, { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import FilterAlt from '@mui/icons-material/FilterAlt';

import SearchField from '../../components/SearchField';
import AutocompleteField from '../../components/AutocompleteField';
import { SelectField } from '../../components/SelectField';
import {
  SelectFieldProps,
  SelectOption,
  allOption,
} from '../../components/SelectField/SelectField';
import { SearchFieldProps } from '../../components/SearchField/SearchField';
import { OrderableDropDown, ListItem } from '../OrderableDropDown';
import { DatePickerProps } from '@mui/x-date-pickers';
import DatePickerField from '../../components/DatePickerField';

/**
 * Type of filter variants available.
 */
export type FilterVariant = 'text' | 'autocomplete' | 'select' | 'date';

/**
 * Common properties for all filters.
 */
export type FilterCommon = {
  id: string;
  label: string;
  isLoading?: boolean;
  columns?: number;
  size?: SearchFieldProps['size'] | SelectFieldProps['size'];
  showOnMount?: boolean;
  hide?: boolean;
};

/**
 * Properties for the text filter.
 */
export type TextFilter = {
  type: 'text';
  helperText?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onDebouncedSearchChange?: (value: string) => void;
  value?: string;
  searchIconPlacement?: SearchFieldProps['searchIconPlacement'];
} & FilterCommon;

/**
 * Properties for the date filter.
 */
type DateFilter = {
  type: 'date';
  onChange: (value: Date | null) => void;
  onDebouncedSearchChange?: (value: Date) => void;
} & FilterCommon &
  DatePickerProps<Date>;

/**
 * Properties for the autocomplete filter.
 */
type AutocompleteFilter = {
  type: 'autocomplete';
  value?: string | null;
  options?: SelectOption[];
  resource?: string;
  resourceLabel?: string;
  resourceValue?: string;
  defaultValue?: SelectOption;
  onChange: (value: string | null) => void;
} & FilterCommon;

/**
 * Properties for the select filter.
 */
type SelectFilter = {
  type: 'select';
  options: SelectOption[];
  multiple?: boolean;
  defaultValue?: string;
  size?: SelectFieldProps['size'];
  onChange: (value: string | string[] | null) => void;
  value?: string | string[] | null;
} & FilterCommon;

/**
 * Type for filter properties that can be text, date, autocomplete, or select.
 */
export type FilterType =
  | TextFilter
  | DateFilter
  | AutocompleteFilter
  | SelectFilter;

/**
 * Renders the appropriate component based on the filter type.
 *
 * @param filter - The filter object containing type and properties
 * @returns The corresponding React component for the filter type
 */
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
          value={filter.value}
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
          minDate={filter.minDate}
          maxDate={filter.maxDate}
        />
      );

    case 'select':
      return (
        <SelectField
          fullWidth
          multiple={filter.multiple}
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
          helperText={filter.helperText}
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
          searchIconPlacement={filter.searchIconPlacement}
        />
      );

    default:
      return <></>;
  }
};

/**
 * Properties for the Filter component.
 */
export type FilterProps = {
  /** Array of filter objects */
  filters: FilterType[];
  /** Minimum number of filters to enable sortable item in the orderable dropdown */
  minimumFilters?: number;
  /** Include an "all" option in the filter dropdown */
  hasAllOption?: boolean;
  /** Children elements */
  children?: ReactNode;
  /** Additional items to render in the grid */
  additionalGridItems?: {
    component: ReactNode | ((filters: ListItem[]) => ReactNode);
    columns?: number;
  }[];
  /** Additional actions to render */
  complementaryActions?: ReactNode | ((filters: ListItem[]) => ReactNode);
  /** Identifier for filter settings on localStorage */
  orderableListCacheKey?: string;
  /** Identifier for filter settings api endpoint path */
  cacheApiPath?: string;
} & GridProps;

export const Filter = (props: FilterProps) => {
  const { filters, minimumFilters = 0, hasAllOption, ...rest } = props;

  const resetFilters = (item) => () => {
    if (item && item?.onDebouncedSearchChange) {
      item.onDebouncedSearchChange(null);
    }
    if (item && item?.onChange) {
      item.onChange(null);
    }
  };

  const [filterOrder, setFilterOrder] = useState<ListItem[]>(
    filters.map((filter) => ({
      id: filter.id,
      label: filter.label,
      hide: filter.hide ?? false,
      resetFilters: resetFilters(filter),
    })),
  );

  const handleListUpdateFromCache = (cacheList: ListItem[]) => {
    const newItems = cacheList.map((item) => {
      const filterItemIndex = filters.findIndex(
        (filter) => filter.id === item.id,
      );
      const filterItem = filters[filterItemIndex];

      return {
        ...item,
        ...filterItem,
        resetFilters: resetFilters(filterItem),
      };
    });

    setFilterOrder(newItems);
  };

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
                {typeof node.component === 'function'
                  ? node.component(filterOrder)
                  : node.component}
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
        {filters.length ? (
          <OrderableDropDown
            hasAllOption={hasAllOption}
            minimumItems={minimumFilters}
            icon={<FilterAlt />}
            list={filterOrder}
            setList={setFilterOrder}
            storage={{
              type: 'filter',
              key: props.orderableListCacheKey,
              cacheApiPath: props.cacheApiPath,
              onListUpdateFromCache: handleListUpdateFromCache,
            }}
          />
        ) : null}
        {typeof props.complementaryActions === 'function'
          ? props.complementaryActions(filterOrder)
          : props.complementaryActions}
      </Box>
    </Box>
  );
};
