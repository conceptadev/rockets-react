import React, { useState, useEffect, PropsWithChildren } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CrudContext, CrudContextProps, FilterValues } from './useCrudRoot';
import { getSearchParams } from '../../utils/http';

type Props = Omit<CrudContextProps, 'filterValues' | 'setFilterValues'> & {
  filterCallback?: (filter: FilterValues) => void;
};

const CrudRoot = (props: PropsWithChildren<Props>) => {
  const {
    filters,
    search,
    updateSearch,
    simpleFilter,
    updateSimpleFilter,
    filterCallback,
    externalSearch,
    children,
  } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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

    router.replace(`${pathname}?${hasValues ? newFilterValues : ''}`);
  }, [filterValues]);

  return (
    <CrudContext.Provider
      value={{
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
