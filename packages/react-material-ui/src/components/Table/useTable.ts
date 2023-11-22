'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { Order, SimpleFilter, TableQueryStateProps } from './types';
import {
  TABLE_QUERY_STATE_DEFAULT_VALUE,
  useTableQueryState,
} from './hooks/useTableQueryState';
import { getSearchParams } from '../../utils/http';
import { DataProviderRequestOptions } from '@concepta/react-data-provider/dist/interfaces';

interface UseTableOptions {
  rowsPerPage?: number;
  page?: number;
  orderBy?: string;
  order?: Order;
  simpleFilter?: SimpleFilter;
  search?: string;
  callbacks?: DataProviderRequestOptions;
  noPagination?: boolean;
}

export type UseTableProps = (
  resource: string,
  options?: UseTableOptions,
) => {
  data: unknown[];
  isPending: boolean;
  error: unknown;
  total: number;
  pageCount: number;
  execute: () => void;
  refresh: () => void;
  updateSimpleFilter: (
    simpleFilter: SimpleFilter | null,
    resetPage?: boolean,
  ) => void;
  simpleFilter: SimpleFilter;
  search: string;
  tableQueryState: TableQueryStateProps;
  setTableQueryState: React.Dispatch<
    React.SetStateAction<TableQueryStateProps>
  >;
};

/**
 * A custom hook for managing table data and state, including pagination, sorting, and filtering.
 *
 * @param resource - The resource URI for the table data.
 * @param options - Optional configuration options for the table.
 * @returns - An object containing data, state, and functions related to the table.
 */
const useTable: UseTableProps = (resource, options) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { get } = useDataProvider();

  const { tableQueryState, setTableQueryState } = useTableQueryState(options);

  const _search = searchParams.get('search') || options?.search;

  const params = {
    search: _search,
  };

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      simpleFilter: JSON.stringify(tableQueryState?.simpleFilter),
    });

    router.replace(`${pathname}?${newSearchParam ?? ''}`);
  }, [JSON.stringify(tableQueryState.simpleFilter)]);

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      search: options?.search,
    });

    if (newSearchParam) {
      router.replace(`${pathname}?${newSearchParam}`);
    }
  }, [options?.search]);

  const simpleFilterQuery = () => {
    if (!tableQueryState.simpleFilter) return;

    const queryArr = [];
    for (const [key, value] of Object.entries(tableQueryState.simpleFilter)) {
      queryArr.push(`${key}${value}`);
    }
    return queryArr;
  };

  useEffect(() => {
    execute();
  }, [JSON.stringify(tableQueryState)]);

  const getResource = () => {
    return get({
      uri: resource,
      queryParams: {
        ...(tableQueryState?.rowsPerPage &&
          !options?.noPagination && {
            limit: tableQueryState.rowsPerPage,
          }),
        page: tableQueryState.page,
        ...(tableQueryState?.orderBy && {
          sort: `${
            tableQueryState?.orderBy
          },${tableQueryState?.order.toUpperCase()}`,
        }),
        ...(tableQueryState?.simpleFilter && { filter: simpleFilterQuery() }),
        ...(params?.search && { s: params?.search }),
      },
    });
  };

  const { data, execute, refresh, isPending, error } = useQuery(
    getResource,
    false,
    options?.callbacks,
  );

  const updateSimpleFilter = (
    simpleFilter: SimpleFilter | null,
    resetPage = true,
  ) => {
    setTableQueryState((prevState) => {
      // Removed current simpleFilter from state
      const updatedState = { ...prevState };

      for (const entries of Object.entries(simpleFilter)) {
        const [key, value] = entries;

        if (!value && !updatedState?.simpleFilter?.[key]) continue;

        if (!value) {
          delete updatedState.simpleFilter[key];
        } else {
          if (typeof updatedState.simpleFilter === 'undefined') {
            updatedState.simpleFilter = {
              [key]: value,
            };
          } else {
            updatedState.simpleFilter[key] = value;
          }
        }
      }

      if (!resetPage) {
        return updatedState;
      }

      const updatedSimpleFilter =
        updatedState?.simpleFilter &&
        Object.keys(updatedState.simpleFilter).length > 0
          ? updatedState.simpleFilter
          : undefined;

      const res = {
        ...(updatedState && {
          ...updatedState,
          simpleFilter: updatedSimpleFilter,
          page: TABLE_QUERY_STATE_DEFAULT_VALUE.page,
        }),
      };

      return res;
    });
  };

  return {
    data: data?.data,
    isPending,
    error,
    execute,
    refresh,
    updateSimpleFilter,
    simpleFilter: tableQueryState?.simpleFilter,
    search: params.search,
    total: data?.total,
    pageCount: data?.pageCount,
    tableQueryState,
    setTableQueryState,
  };
};

export default useTable;
