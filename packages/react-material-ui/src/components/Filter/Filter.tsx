'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Box, Grid, GridProps } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import { useAuth } from '@concepta/react-auth-provider';

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
import { useSettingsStorage } from '../../hooks/useSettingsStorage';

export type FilterVariant = 'text' | 'autocomplete' | 'select' | 'date';

export type FilterCommon = {
  id: string;
  label: string;
  isLoading?: boolean;
  columns?: number;
  size?: SearchFieldProps['size'] | SelectFieldProps['size'];
  showOnMount?: boolean;
  hide?: boolean;
};

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

type DateFilter = {
  type: 'date';
  onChange: (value: Date | null) => void;
  onDebouncedSearchChange?: (value: Date) => void;
} & FilterCommon &
  DatePickerProps<Date>;

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

type SelectFilter = {
  type: 'select';
  options: SelectOption[];
  multiple?: boolean;
  defaultValue?: string;
  size?: SelectFieldProps['size'];
  onChange: (value: string | string[] | null) => void;
  value?: string | string[] | null;
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

export type FilterProps = {
  filters: FilterType[];
  minimumFilters?: number;
  hasAllOption?: boolean;
  children?: ReactNode;
  additionalGridItems?: {
    component: ReactNode | ((filters: ListItem[]) => ReactNode);
    columns?: number;
  }[];
  complementaryActions?: ReactNode | ((filters: ListItem[]) => ReactNode);
  settingsId?: string;
} & GridProps;

const Filter = (props: FilterProps) => {
  const { filters, minimumFilters = 0, hasAllOption, ...rest } = props;
  const auth = useAuth();

  const [settings, setSettings] = useSettingsStorage({
    key: 'filterSettings',
    user: (auth?.user as { id: string })?.id ?? '',
    settingsId: props.settingsId || window.location.pathname,
    list: filters.map((header) => ({
      id: header.id,
      hide: Boolean(header.hide),
    })),
  });

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

  const handleFilterOrderChange = (list: ListItem[]) => {
    setFilterOrder(list);
    setSettings(list);
  };

  useEffect(() => {
    if (settings.length) {
      setFilterOrder(
        settings.map((item: ListItem) => {
          const filterItem = filters.find((filter) => filter.id === item.id);

          return {
            ...item,
            ...filterItem,
            resetFilters: resetFilters(filterItem),
          };
        }),
      );
    }
  }, []);

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
            setList={handleFilterOrderChange}
          />
        ) : null}
        {typeof props.complementaryActions === 'function'
          ? props.complementaryActions(filterOrder)
          : props.complementaryActions}
      </Box>
    </Box>
  );
};

export default Filter;
