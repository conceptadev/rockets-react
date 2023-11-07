import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import isEqual from 'lodash/isEqual';
import { Order, TableQueryStateProps } from './types';
import { useTableQueryState } from './hooks/useTableQueryState';
import { getSearchParams } from '../../utils/http';

type BasicType = string | number | boolean;

interface UseTableOptions {
  rowsPerPage?: number;
  page?: number;
  orderBy?: string;
  order?: Order;
  simpleFilter?: Record<string, BasicType | BasicType[]>;
  search?: string;
  callbacks?: DataProviderRequestProps;
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
  tableQuery: TableQueryStateProps;
  setTableState: React.Dispatch<React.SetStateAction<TableQueryStateProps>>;
};

/**
 * A custom hook for managing table data and state, including pagination, sorting, and filtering.
 *
 * @param resource - The resource URI for the table data.
 * @param {TableOptions} options - Optional configuration options for the table.
 * @returns {TableHookResult} - An object containing data, state, and functions related to the table.
 */
const useTable: UseTableProps = (resource, options) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { get } = useDataProvider();

  const { tableState, setTableState } = useTableQueryState();

  const params = useMemo(() => {
    const _simpleFilter =
      options?.simpleFilter && JSON.stringify(options.simpleFilter);
    const _search = options?.search;

    return {
      simpleFilter: _simpleFilter ? JSON.parse(_simpleFilter) : undefined,
      search: _search,
    };
  }, [searchParams, JSON.stringify(options)]);

  useEffect(() => {
    if (
      options?.simpleFilter &&
      !isEqual(options.simpleFilter, params.simpleFilter)
    ) {
      const newSearchParam = getSearchParams(searchParams, {
        simpleFilter: JSON.stringify(options.simpleFilter),
      });

      if (newSearchParam) {
        router.replace(`${pathname}?${newSearchParam}`);
      }
    }
  }, [options?.simpleFilter]);

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      search: options.search,
    });

    if (newSearchParam) {
      router.replace(`${pathname}?${newSearchParam}`);
    }
  }, [options?.search]);

  const simpleFilterQuery = () => {
    if (!params.simpleFilter) return;

    const queryArr = [];
    for (const [key, value] of Object.entries(params.simpleFilter)) {
      queryArr.push(`${key}||$eq||${value}`);
    }
    return queryArr;
  };

  useEffect(() => {
    execute();
  }, [
    JSON.stringify(params),
    JSON.stringify(options),
    JSON.stringify(tableState),
  ]);

  const getResource = () => {
    return get({
      uri: resource,
      queryParams: {
        ...(tableState?.rowsPerPage && {
          limit: Number(tableState.rowsPerPage),
        }),
        page: Number(tableState.page) || 1,
        ...(tableState?.orderBy && {
          sort: `${tableState?.orderBy},${tableState?.order.toUpperCase()}`,
        }),
        ...(params?.simpleFilter && { filter: simpleFilterQuery() }),
        ...(params?.search && { s: params?.search }),
      },
    });
  };

  const { data, execute, isPending, error } = useQuery(
    getResource,
    false,
    options?.callbacks,
  );

  return {
    data: data?.data,
    isPending,
    error,
    total: data?.total,
    pageCount: data?.pageCount,
    tableQuery: tableState,
    setTableState,
  };
};

export default useTable;
