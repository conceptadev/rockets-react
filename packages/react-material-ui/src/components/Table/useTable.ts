'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { Order, TableStateProps } from './types';
import {
  TABLE_STATE_DEFAULT_VALUE,
  useTableState,
} from './hooks/useTableState';
import { DataProviderRequestOptions } from '@concepta/react-data-provider/dist/interfaces';
import { CreateQueryParams, RequestQueryBuilder } from '@nestjsx/crud-request';
import { keyBy } from 'lodash';

const setFilters = (
  filters: CreateQueryParams['filter'][] | undefined,
  query: RequestQueryBuilder,
) => {
  if (!filters) return;

  filters.forEach((filter) => query.setFilter(filter));
};

const getQueryParams = (
  searchParams: URLSearchParams,
  initialState: QueryParams,
) => {
  const params = new URLSearchParams(searchParams);
  const filters = [];

  params.forEach((value, key) => {
    if (key.startsWith('filter')) {
      filters.push(value);
    }
  });

  const formattedFilter = filters.map((filter) => {
    const [field, operator, value] = filter.split('||');

    return {
      field,
      operator,
      value,
    };
  });

  const filtersByKey = keyBy(formattedFilter, 'field');

  const searchInitialState = (
    searchParams?.get('search') &&
    RequestQueryBuilder.create().search(JSON.parse(searchParams?.get('search')))
  )?.queryObject.search;

  return {
    filter: (filters && filtersByKey) || initialState?.filter || undefined,
    search: searchInitialState || initialState?.search || undefined,
  };
};

type QueryParams = {
  filter: {
    [key: string]: CreateQueryParams['filter'];
  };
  search: CreateQueryParams['search'];
};

type UseTableOptions = {
  rowsPerPage?: number;
  page?: number;
  orderBy?: string;
  order?: Order;
  filter: {
    [key: string]: CreateQueryParams['filter'];
  };
  search?: CreateQueryParams['search'];
  callbacks?: DataProviderRequestOptions;
  noPagination?: boolean;
};

export type UseTableProps = (
  resource: string,
  options?: UseTableOptions,
) => {
  data: unknown[];
  isPending: boolean;
  error: unknown;
  total: number;
  pageCount: number;
  filter: {
    [key: string]: CreateQueryParams['filter'];
  };
  search: CreateQueryParams['search'];
  tableState: TableStateProps;
  execute: () => void;
  refresh: () => void;
  setSearch: (search: CreateQueryParams['search'], resetPage?: boolean) => void;
  setTableState: React.Dispatch<React.SetStateAction<TableStateProps>>;
  setFilter: (filter: CreateQueryParams['filter'], resetPage?: boolean) => void;
  removeFilter: (filterName: string) => void;
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

  const { tableState, setTableState } = useTableState(options);
  const [queryParams, setQueryParams] = useState<QueryParams>(
    getQueryParams(searchParams, {
      filter: options.filter,
      search: options.search,
    }),
  );

  const getResource = () => {
    let uri = resource;

    if (queryParams?.filter) {
      const query = RequestQueryBuilder.create();
      setFilters(Object.values(queryParams?.filter), query);

      uri = `${uri}?${query.query()}`;
    }

    return get({
      uri,
      queryParams: {
        ...(tableState?.rowsPerPage &&
          !options?.noPagination && {
            limit: tableState.rowsPerPage,
          }),
        page: tableState.page,
        ...(tableState?.orderBy && {
          sort: `${tableState?.orderBy},${tableState?.order.toUpperCase()}`,
        }),
      },
    });
  };

  const { data, execute, refresh, isPending, error } = useQuery(
    getResource,
    false,
    options?.callbacks,
  );

  const setFilter = (filter: CreateQueryParams['filter'], resetPage = true) => {
    setQueryParams((prevState) => {
      const updatedState = { ...prevState };

      if (Array.isArray(filter)) {
        filter.forEach((filterItem) => {
          updatedState.filter = {
            ...(updatedState.filter || {}),
            [filterItem.field]: filterItem,
          };
        });
      } else {
        updatedState.filter = {
          ...(updatedState.filter || {}),
          [filter.field]: filter,
        };
      }

      if (!resetPage) {
        return updatedState;
      }

      setTableState((prevState) => ({
        ...prevState,
        page: TABLE_STATE_DEFAULT_VALUE.page,
      }));

      return updatedState;
    });
  };

  const removeFilter = (filterName: string) => {
    setQueryParams((prevState) => {
      // Removed current filter from state
      const updatedState = { ...prevState };

      delete updatedState.filter[filterName];

      return updatedState;
    });
  };

  const setSearch = (search: CreateQueryParams['search'], resetPage = true) => {
    setQueryParams((prevState) => {
      const updatedState = { ...prevState };

      updatedState.search = search;

      if (!resetPage) {
        return updatedState;
      }

      setTableState((prevState) => ({
        ...prevState,
        page: TABLE_STATE_DEFAULT_VALUE.page,
      }));
      return updatedState;
    });
  };

  const removeSearch = () => {
    setQueryParams((prevState) => {
      const updatedState = { ...prevState };

      delete updatedState.search;
      return updatedState;
    });
  };

  useEffect(() => {
    const page = searchParams.get('page');
    const rowsPerPage = searchParams.get('rowsPerPage');
    const order = searchParams.get('order');
    const orderBy = searchParams.get('orderBy');

    const tableStateSearchParams = [
      page && `page=${page}`,
      rowsPerPage && `rowsPerPage=${rowsPerPage}`,
      order && `order=${order}`,
      orderBy && `orderBy=${orderBy}`,
    ]
      .filter(Boolean)
      .join('&');

    const query = RequestQueryBuilder.create();
    setFilters(
      queryParams?.filter ? Object.values(queryParams.filter) : undefined,
      query,
    );
    query.search(queryParams.search);

    router.replace(`${pathname}?${query.query()}&${tableStateSearchParams}`);
  }, [JSON.stringify(queryParams.filter)]);

  useEffect(() => {
    execute();
  }, [JSON.stringify(queryParams), JSON.stringify(tableState)]);

  return {
    data: data?.data,
    isPending,
    error,
    execute,
    refresh,
    filter: queryParams?.filter,
    search: queryParams?.search,
    total: data?.total,
    pageCount: data?.pageCount,
    tableState,
    setSearch,
    removeSearch,
    setTableState,
    setFilter,
    removeFilter,
  };
};

export default useTable;
