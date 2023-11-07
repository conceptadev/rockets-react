import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import isEqual from 'lodash/isEqual';
import { Order } from './Table';
import { DataProviderRequestOptions } from '@concepta/react-data-provider/dist/interfaces';

type BasicType = string | number | boolean;

interface Options {
  rowsPerPage?: number;
  page?: number;
  orderBy?: string;
  order?: Order;
  simpleFilter?: Record<string, BasicType | BasicType[]>;
  search?: string;
  callbacks?: DataProviderRequestOptions;
  noPagination?: boolean;
}

export interface TableProps {
  count: number;
  total: number;
  page: number;
  pageCount: number;
  rowsPerPage: number;
  orderBy: string;
  order: Order;
  setPage: (page: TableProps['page']) => void;
  setRowsPerPage: (rowsPerPage: TableProps['rowsPerPage']) => void;
  setOrder: (order: TableProps['order']) => void;
  setOrderBy: (orderBy: TableProps['orderBy']) => void;
}

export type UseTableProps = (
  resource: string,
  options?: Options,
) => {
  data: unknown[];
  isPending: boolean;
  error: unknown;
  tableProps: TableProps;
};

const useTable: UseTableProps = (resource, options) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { get } = useDataProvider();

  const params = useMemo(() => {
    const params = new URLSearchParams(searchParams); //ts known error fixed here: https://github.com/vercel/next.js/issues/49245

    const _rowsPerPage = params.get('rowsPerPage') || options?.rowsPerPage || 5;
    const _page = params.get('page') || options?.page || 1;
    const _simpleFilter =
      params.get('simpleFilter') ||
      (options?.simpleFilter && JSON.stringify(options.simpleFilter));
    const _search = params.get('search') || options?.search;
    const _order =
      (params.get('order') as TableProps['order']) || options?.order || 'asc';
    const _orderBy = params.get('orderBy') || options?.orderBy || '';

    return {
      page: Number(_page),
      rowsPerPage: Number(_rowsPerPage),
      simpleFilter: _simpleFilter ? JSON.parse(_simpleFilter) : undefined,
      search: _search,
      order: _order,
      orderBy: _orderBy,
    };
  }, [searchParams, JSON.stringify(options)]);

  const createQueryString = (
    name: string,
    value: string | undefined | null,
  ) => {
    const params = new URLSearchParams(searchParams); // ts known error fixed here: https://github.com/vercel/next.js/issues/49245
    if (!value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    return params.toString();
  };

  useEffect(() => {
    if (
      options?.simpleFilter &&
      !isEqual(options.simpleFilter, params.simpleFilter)
    ) {
      router.replace(
        pathname +
          '?' +
          createQueryString(
            'simpleFilter',
            JSON.stringify(options.simpleFilter),
          ),
      );
    }
  }, [options?.simpleFilter]);

  useEffect(() => {
    if (options?.search && options.search !== params.search) {
      router.replace(
        pathname + '?' + createQueryString('search', options.search),
      );
    }
  }, [options?.search]);

  const setRowsPerPage = (rowsPerPage: TableProps['rowsPerPage']) => {
    if (rowsPerPage != Number(params.rowsPerPage)) {
      router.replace(
        pathname + '?' + createQueryString('rowsPerPage', String(rowsPerPage)),
      );
    }
  };

  const setPage = (page: TableProps['page']) => {
    if (page != Number(params.page)) {
      router.replace(pathname + '?' + createQueryString('page', String(page)));
    }
  };

  const setOrder = (order: TableProps['order']) => {
    if (order != params.order) {
      router.replace(
        pathname + '?' + createQueryString('order', String(order)),
      );
    }
  };

  const setOrderBy = (orderBy: TableProps['orderBy']) => {
    if (orderBy != params.orderBy) {
      router.replace(
        pathname + '?' + createQueryString('orderBy', String(orderBy)),
      );
    }
  };

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
  }, [params]);

  const getResource = () => {
    return get({
      uri: resource,
      queryParams: {
        ...(!options.noPagination && {
          limit: Number(params.rowsPerPage),
        }),
        page: Number(params.page) || 1,
        ...(params?.orderBy && {
          sort: `${params?.orderBy},${params?.order.toUpperCase()}`,
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
    simpleFilter: params.simpleFilter,
    search: params.search,
    tableProps: {
      count: data?.data?.length,
      total: data?.total,
      page: (params.page || 1) - 1,
      pageCount: data?.pageCount,
      rowsPerPage: params.rowsPerPage,
      order: params.order,
      orderBy: params.orderBy,
      setPage,
      setRowsPerPage,
      setOrder,
      setOrderBy,
    },
  };
};

export default useTable;
