import React, { useEffect } from 'react';
import Filter, {
  FilterVariant,
  FilterCommon,
  FilterType,
  TextFilter,
} from '../../../components/Filter';
import { SelectOption } from '../../../components/SelectField/SelectField';
import { useCrudRoot, FilterValues } from '../../../modules/crud/useCrudRoot';

type Operator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'starts'
  | 'ends'
  | 'cont'
  | 'excl'
  | 'eqL'
  | 'neL'
  | 'startsL'
  | 'endsL'
  | 'contL'
  | 'exclL';

export type FilterDetails = {
  type: FilterVariant;
  resource?: string;
  resourceLabel?: string;
  resourceValue?: string;
  operator?: Operator;
  options?: SelectOption[];
  searchIconPlacement?: TextFilter['searchIconPlacement'];
} & Omit<FilterCommon, 'showOnMount' | 'hide'>;

export type FilterCallback = (filter: FilterValues) => void;

const FilterSubmodule = () => {
  const {
    filters,
    updateSearch,
    simpleFilter,
    updateSimpleFilter,
    externalSearch,
    filterValues,
    setFilterValues,
  } = useCrudRoot();

  const hasExternalSearch =
    externalSearch &&
    Object.values(externalSearch).filter((value) => value).length > 0;

  const reduceFilters = (
    _filterValues: FilterValues,
    format: 'simpleFilter' | 'search',
  ) =>
    filters.reduce((acc, filter) => {
      const value = _filterValues[filter.id];

      if (!filter.operator) return acc;
      if (typeof value === 'undefined') return acc;

      const data =
        format === 'simpleFilter'
          ? `||$${filter.operator}||${value}`
          : { [`$${filter.operator}`]: value };

      return {
        ...acc,
        [filter.id]:
          value === null || value === 'all' || value === '' ? null : data,
      };
    }, {});

  useEffect(() => {
    if (!hasExternalSearch) {
      updateSearch(null);
      updateSimpleFilter(reduceFilters(filterValues, 'simpleFilter'), true);
    }
    if (hasExternalSearch) {
      const combinedFilter = {
        ...reduceFilters(filterValues, 'search'),
        ...externalSearch,
      };

      updateSearch(combinedFilter, true);
    }
  }, [externalSearch]);

  const onFilterChange = (
    id: string,
    value: string | Date | null,
    updateFilter?: boolean,
  ) => {
    setFilterValues((prv) => {
      const newFilterValues = { ...prv, [id]: value };

      if (updateFilter) {
        updateSimpleFilter(
          reduceFilters(newFilterValues, 'simpleFilter'),
          true,
        );
      }
      return newFilterValues;
    });
  };

  const filterObjs: FilterType[] = filters.map((filter) => {
    const {
      id,
      label,
      columns,
      type,
      options,
      operator,
      isLoading,
      size,
      resource,
      resourceValue,
      resourceLabel,
    } = filter;

    const initialValue = String(simpleFilter?.[id])?.split('||')[2];

    const value = filterValues[id] ?? initialValue;

    const commonFields = {
      id,
      label,
      columns,
      isLoading,
      size,
      operator,
    };

    switch (type) {
      case 'text':
        return {
          ...commonFields,
          type,
          value: value as string,
          onChange: (val: string | null) => onFilterChange(id, val, false),
          onDebouncedSearchChange: (val: string) =>
            onFilterChange(id, val, true),
        };

      case 'autocomplete':
        return {
          ...commonFields,
          type,
          options,
          value: value as string,
          resource,
          resourceLabel,
          resourceValue,
          onChange: (val: string | null) => onFilterChange(id, val, true),
        };

      case 'select':
        return {
          ...commonFields,
          type,
          options,
          value: value as string,
          onChange: (val: string | null) => onFilterChange(id, val, false),
        };

      case 'date':
        return {
          ...commonFields,
          type,
          options,
          value: value as unknown as Date,
          onChange: (val: Date | null) => onFilterChange(id, val, false),
          onDebouncedSearchChange: (val: Date) => onFilterChange(id, val, true),
        };

      default:
        break;
    }
  });

  if (filters.length === 0) return null;

  return <Filter filters={filterObjs} />;
};

export default FilterSubmodule;
