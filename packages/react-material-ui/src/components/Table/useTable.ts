'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import {
  Order,
  Search,
  SimpleFilter,
  UpdateSimpleFilter,
  TableQueryStateProps,
  TableResponseData,
} from './types';
import {
  TABLE_QUERY_STATE_DEFAULT_VALUE,
  useTableQueryState,
} from './hooks/useTableQueryState';
import { getSearchParams } from '../../utils/http';
import { DataProviderRequestOptions } from '@concepta/react-data-provider/dist/interfaces';

interface UseTableOptions {
  /**
   * Quantity of items displayed in a Table page.
   */
  rowsPerPage?: number;
  /**
   * Current page number.
   */
  page?: number;
  /**
   * String that indicates which Table column will be the sorting parameter.
   */
  orderBy?: string;
  /**
   * String that indicates Ascending or Descending order of Tbale rows.
   */
  order?: Order;
  /**
   * Object that represents filters for Table data.
   */
  simpleFilter?: SimpleFilter;
  /**
   * Object for filtering Table data in a more intricate way, including contain and equal operators.
   */
  search?: Search;
  /**
   * Object where each field is a callback: onSuccess, onError, onFinish and formatData.
   */
  callbacks?: DataProviderRequestOptions;
  /**
   * Boolean that indicates if Table pagination should be displayed.
   */
  noPagination?: boolean;
}

export interface UpdateSearch {
  /**
   * Callback for updating Table filtering based on URL params.
   *
   * @param search - The new value for the search attribute.
   * @param resetPage - Boolean that indicates if the current page should be set to one.
   */
  (search: Search | null, resetPage?: boolean): void;
}

export interface UseTableResult {
  /**
   * Array of objects returned form the API where each contain the data displayed in Table rows.
   */
  data: unknown[];
  /**
   * Boolean that indicates loading state for Table rows.
   */
  isPending: boolean;
  /**
   * Error returned from the Table API call.
   */
  error: unknown;
  /**
   * Total of items displayed in the Table.
   */
  total: number;
  /**
   * Total of pages rendered by the Table.
   */
  pageCount: number;
  /**
   * Callback for performing an API call for the Table API resource.
   */
  execute: () => void;
  /**
   * Callback for performing an API call for the Table API resource and refreshing Table data.
   */
  refresh: () => void;
  /**
   * Callback for updating the Table filter object.
   */
  updateSimpleFilter: UpdateSimpleFilter;
  /**
   * Callback for updating Table filtering based on URL params.
   *
   * @param search - The new value for the search attribute.
   * @param resetPage - Boolean that indicates if the current page should be set to one.
   */
  updateSearch: UpdateSearch;
  /**
   * Object that represents filters for Table data.
   */
  simpleFilter: SimpleFilter;
  /**
   * Object for filtering Table data in a more intricate way, including contain and equal operators.
   */
  search: Search;
  /**
   * Table state containing page, order and search properties.
   */
  tableQueryState: TableQueryStateProps;
  /**
   * Callback for changing Table state dinamically.
   */
  setTableQueryState: React.Dispatch<
    React.SetStateAction<TableQueryStateProps>
  >;
}

export type UseTableProps = (
  /**
   * API resource that will be used for fetching and updating Table data.
   */
  resource: string,
  /**
   * Custom parameters for the Table data, sorting and pagination.
   */
  options?: UseTableOptions,
) => UseTableResult;

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
  const firstRender = useRef(true);

  const { tableQueryState, setTableQueryState } = useTableQueryState(options);

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      simpleFilter: JSON.stringify(tableQueryState?.simpleFilter),
    });

    router.replace(`${pathname}?${newSearchParam ?? ''}`);
  }, [JSON.stringify(tableQueryState.simpleFilter)]);

  useEffect(() => {
    const newSearchParam = getSearchParams(searchParams, {
      search: JSON.stringify(tableQueryState?.search),
    });

    router.replace(`${pathname}?${newSearchParam ?? ''}`);
  }, [JSON.stringify(tableQueryState.search)]);

  const simpleFilterQuery = () => {
    if (!tableQueryState.simpleFilter) return;

    const queryArr = [];
    for (const [key, value] of Object.entries(tableQueryState.simpleFilter)) {
      queryArr.push(`${key}${value}`);
    }
    return queryArr as string[];
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
        ...(tableQueryState?.search && {
          s: JSON.stringify(tableQueryState?.search),
        }),
      },
    });
  };

  const { data, execute, refresh, isPending, error } =
    useQuery<TableResponseData>(getResource, false, options?.callbacks);

  // TODO: This will be refactored with Query Builder
  // For now it works even though not optimized
  const updateSimpleFilter = (
    simpleFilter: SimpleFilter | null,
    resetPage = true,
  ) => {
    setTableQueryState((prevState) => {
      // Removed current simpleFilter from state
      const updatedState = { ...prevState };

      for (const entries of Object.entries(simpleFilter)) {
        const [key, value] = entries;

        // Loose equality evals for `undefined` and `null`
        if (value == null) {
          delete updatedState?.simpleFilter?.[key];
        } else {
          if (typeof updatedState?.simpleFilter === 'undefined') {
            updatedState.simpleFilter = {
              [key]: value,
            };
          } else {
            updatedState.simpleFilter[key] = value;
          }
        }
      }

      const updatedSimpleFilter =
        updatedState?.simpleFilter &&
        Object.keys(updatedState.simpleFilter).length > 0
          ? updatedState.simpleFilter
          : undefined;

      const res = {
        ...(updatedState && {
          ...updatedState,
          ...(resetPage &&
            !firstRender.current && {
              page: TABLE_QUERY_STATE_DEFAULT_VALUE.page,
            }),
          simpleFilter: updatedSimpleFilter,
        }),
      };

      if (firstRender.current) {
        firstRender.current = false;
      }

      return res;
    });
  };

  // TODO: This will be refactored with Query Builder
  // For now it works even though not optimized
  const updateSearch: UpdateSearch = (
    search: Search | null,
    resetPage = true,
  ) => {
    setTableQueryState((prevState) => {
      // Removed current search from state
      const updatedState = { ...prevState };

      if (search === null) {
        updatedState.search = undefined;
      }

      if (search) {
        for (const entries of Object.entries(search)) {
          const [key, value] = entries;

          // Loose equality evals for `undefined` and `null`
          if (value == null) {
            delete updatedState?.search?.[key];
          } else {
            // This will update the search
            // should only no update if value is null or undefined
            if (typeof updatedState?.search === 'undefined') {
              updatedState.search = {
                [key]: value,
              };
            } else {
              updatedState.search[key] = value;
            }
          }
        }
      }

      const updatedSearch =
        updatedState?.search && Object.keys(updatedState.search).length > 0
          ? updatedState.search
          : undefined;

      const res = {
        ...(updatedState && {
          ...updatedState,
          ...(resetPage &&
            !firstRender.current && {
              page: TABLE_QUERY_STATE_DEFAULT_VALUE.page,
            }),
          search: updatedSearch,
        }),
      };

      if (firstRender.current) {
        firstRender.current = false;
      }

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
    updateSearch,
    search: tableQueryState?.search,
    total: data?.total,
    pageCount: data?.pageCount,
    tableQueryState,
    setTableQueryState,
  };
};

export default useTable;
