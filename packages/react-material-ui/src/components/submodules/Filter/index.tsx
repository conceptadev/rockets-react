import React, { useEffect, useMemo, ReactNode } from 'react';
import {
  Filter,
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
  | 'in'
  | 'notin'
  | 'eqL'
  | 'neL'
  | 'startsL'
  | 'endsL'
  | 'contL'
  | 'exclL'
  | 'inL'
  | 'notinL';

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

type Props = {
  orderableListCacheKey?: string;
  cacheApiPath?: string;
  complementaryActions?: ReactNode;
};

const FilterSubmodule = (props: Props) => {
  const {
    filters,
    updateSearch,
    simpleFilter,
    updateSimpleFilter,
    externalSearch: _externalSearch,
    filterValues,
    setFilterValues,
    customFilter,
    customSearch,
  } = useCrudRoot();

  const customSearchData = useMemo(
    () => customSearch?.(filterValues),
    [filterValues],
  );

  const externalSearch = useMemo(
    () => ({ ..._externalSearch, ...customSearchData }),
    [customSearchData, _externalSearch],
  );

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

      const emptyArray = Array.isArray(value) && value.length === 0;

      const data =
        format === 'simpleFilter'
          ? `||$${filter.operator}||${value}`
          : { [`$${filter.operator}`]: value };

      return {
        ...acc,
        [filter.id]:
          value === null || value === 'all' || value === '' || emptyArray
            ? null
            : data,
      };
    }, {});

  useEffect(() => {
    if (!hasExternalSearch) {
      updateSearch(null);
      const filterObj = {
        ...reduceFilters(filterValues, 'simpleFilter'),
        ...customFilter?.(filterValues),
      };

      updateSimpleFilter(filterObj, true);
    }

    if (hasExternalSearch) {
      const filterObj = {
        ...reduceFilters(filterValues, 'search'),
        ...customFilter?.(filterValues),
      };

      const combinedFilter = {
        ...filterObj,
        ...externalSearch,
      };

      updateSearch(combinedFilter, true);
    }
  }, [externalSearch]);

  const onFilterChange = (
    id: string,
    value: string | string[] | Date | null,
    updateFilter?: boolean,
  ) => {
    setFilterValues((prv) => {
      const newFilterValues = { ...prv, [id]: value };

      if (updateFilter) {
        const filterObj = {
          ...reduceFilters(newFilterValues, 'simpleFilter'),
          ...customFilter?.(newFilterValues),
        };

        updateSimpleFilter(filterObj, true);
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
      searchIconPlacement,
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
      searchIconPlacement,
    };

    switch (type) {
      case 'text':
        return {
          ...commonFields,
          type,
          defaultValue: value as string,
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
          onChange: (val: string | null) => onFilterChange(id, val, true),
        };

      case 'multiSelect':
        return {
          ...commonFields,
          type,
          options,
          value: (value as unknown as string[]) || [],
          onChange: (val: string[] | null) => onFilterChange(id, val, true),
        };

      case 'date':
        return {
          ...commonFields,
          type,
          options,
          value: typeof value === 'string' ? new Date(value) : (value as Date),
          onChange: (val: Date | null) => onFilterChange(id, val, false),
        };

      default:
        break;
    }
  });

  if (filters.length === 0) return null;

  return <Filter {...props} filters={filterObjs} />;
};

export default FilterSubmodule;
