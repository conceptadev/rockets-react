import React, { FC, useState } from 'react';
import Filter, {
  FilterVariant,
  FilterCommon,
  FilterType,
} from '../../../components/Filter';
import { SelectOption } from '../../../components/SelectField/SelectField';
import { UpdateSimpleFilter, SimpleFilter } from 'components/Table/types';

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
  operator: Operator;
  type: FilterVariant;
  options?: SelectOption[];
} & Omit<FilterCommon, 'showOnMount' | 'hide'>;

interface Props {
  filters: FilterDetails[];
  updateSimpleFilter: UpdateSimpleFilter;
  simpleFilter: SimpleFilter;
}

const FilterSubmodule: FC<Props> = ({
  filters,
  updateSimpleFilter,
  simpleFilter,
}) => {
  const [filterValues, setFilterValues] = useState<
    Record<string, string | null>
  >({});

  const onFilterChange = (
    id: string,
    value: string | null,
    updateFilter?: boolean,
  ) => {
    const _filterValues = { ...filterValues, [id]: value };
    setFilterValues(_filterValues);

    if (updateFilter) {
      const simpleFilter = filters.reduce((acc, filter) => {
        const value = _filterValues[filter.id];

        if (typeof value === 'undefined') return acc;

        return {
          ...acc,
          [filter.id]:
            value === null || value === 'all' || value === ''
              ? null
              : `||$${filter.operator}||${value}`,
        };
      }, {});

      updateSimpleFilter(simpleFilter, true);
    }
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
