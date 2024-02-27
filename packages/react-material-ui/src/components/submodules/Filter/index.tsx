import React, { FC, useState, useEffect } from 'react';
import Filter, {
  FilterVariant,
  FilterCommon,
  FilterType,
} from '../../../components/Filter';
import { SelectOption } from '../../../components/SelectField/SelectField';
import {
  UpdateSimpleFilter,
  SimpleFilter,
  Search,
} from 'components/Table/types';
import { UpdateSearch } from '../../../components/Table/useTable';

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

interface Props {
  filters: FilterDetails[];
  updateSimpleFilter: UpdateSimpleFilter;
  simpleFilter: SimpleFilter;
  filterCallback?: (filter: unknown) => void;
  externalSearch?: Search;
  search?: Search;
  updateSearch?: UpdateSearch;
}

type FilterValues = Record<string, string | null>;

const FilterSubmodule: FC<Props> = (props) => {
  const {
    filters,
    updateSimpleFilter,
    simpleFilter,
    filterCallback,
    externalSearch,
    updateSearch,
    search,
  } = props;

  const hasExternalSearch =
    externalSearch &&
    Object.values(externalSearch).filter((value) => value).length > 0;

  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const simpleFilterValue = (_filterValues: FilterValues) =>
    filters.reduce((acc, filter) => {
      const value = _filterValues[filter.id];

      if (!filter.operator) return acc;
      if (typeof value === 'undefined') return acc;

      return {
        ...acc,
        [filter.id]:
          value === null || value === 'all' || value === ''
            ? null
            : `||$${filter.operator}||${value}`,
      };
    }, {});

  const searchFilterValue = (_filterValues: FilterValues) =>
    filters.reduce((acc, filter) => {
      const value = _filterValues[filter.id];

      if (!filter.operator) return acc;
      if (typeof value === 'undefined') return acc;

      return {
        ...acc,
        [filter.id]:
          value === null || value === 'all' || value === ''
            ? null
            : { [`$${filter.operator}`]: value },
      };
    }, {});

  useEffect(() => {
    if (!hasExternalSearch) {
      search && updateSearch(null);
      setShouldUpdate(true);
    }
    if (hasExternalSearch) {
      const combinedFilter = {
        ...searchFilterValue(filterValues),
        ...externalSearch,
      };

      updateSearch(combinedFilter);
    }
  }, [externalSearch]);

  useEffect(() => {
    if (shouldUpdate) {
      updateSimpleFilter(simpleFilterValue(filterValues), true);
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  useEffect(() => {
    filterCallback?.(filterValues);
  }, [filterValues]);

  const onFilterChange = (
    id: string,
    value: string | null,
    updateFilter?: boolean,
  ) => {
    setFilterValues((prv) => ({ ...prv, [id]: value }));
    updateFilter && setShouldUpdate(true);
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
