import React, { useState, useEffect, PropsWithChildren } from 'react';
import { CrudContext, CrudContextProps, FilterValues } from './useCrudRoot';
import { getSearchParams } from '../../utils/http';

type Props = Omit<CrudContextProps, 'filterValues' | 'setFilterValues'> & {
  filterCallback?: (filter: FilterValues) => void;
};

const CrudRoot = (props: PropsWithChildren<Props>) => {
  const {
    customFilter,
    customSearch,
    filters,
    search,
    updateSearch,
    simpleFilter,
    updateSimpleFilter,
    filterCallback,
    externalSearch,
    children,
    navigate,
  } = props;
  const searchParams = new URLSearchParams(window.location.search);

  const [filterValues, setFilterValues] = useState<FilterValues>(
    (searchParams?.get('filterValues') &&
      JSON.parse(searchParams.get('filterValues'))) ||
      {},
  );

  useEffect(() => {
    filterCallback?.(filterValues);
    const newFilterValues = getSearchParams(searchParams, {
      filterValues: JSON.stringify(filterValues),
    });

    const hasValues =
      Object.values(filterValues).filter((value) => value).length > 0;

    navigate &&
      navigate(
        `${window.location.pathname}?${hasValues ? newFilterValues : ''}`,
      );
  }, [filterValues]);

  return (
    <CrudContext.Provider
      value={{
        customFilter,
        customSearch,
        filters,
        search,
        updateSearch,
        simpleFilter,
        updateSimpleFilter,
        externalSearch,
        filterValues,
        setFilterValues,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

export default CrudRoot;
