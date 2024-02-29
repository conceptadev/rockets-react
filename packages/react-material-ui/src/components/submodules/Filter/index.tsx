import React, { useEffect } from 'react';
import Filter, {
  FilterVariant,
  FilterCommon,
  FilterType,
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
  operator?: Operator;
  options?: SelectOption[];
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
    value: string | null,
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
    const { id, label, columns, type, options, operator, isLoading, size } =
      filter;

    const initialValue = String(simpleFilter?.[id])?.split('||')[2];

    const value = filterValues[id] ?? initialValue;

    return {
      id,
      label,
      columns,
      type,
      options,
      operator,
      value,
      isLoading,
      size,
      onChange: (val: string | null) => onFilterChange(id, val, true),
      ...(type === 'text' && {
        onChange: (val: string | null) => onFilterChange(id, val, false),
        onDebouncedSearchChange: (val: string) => onFilterChange(id, val, true),
      }),
    };
  });

  if (filters.length === 0) return null;

  return <Filter filters={filterObjs} />;
};

export default FilterSubmodule;
