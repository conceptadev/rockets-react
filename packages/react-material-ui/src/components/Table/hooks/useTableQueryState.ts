import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { Order, TableQueryStateProps } from '../types';
import { useState } from 'react';

export const TABLE_QUERY_STATE_DEFAULT_VALUE: TableQueryStateProps = {
  order: Order.Asc,
  orderBy: 'id',
  rowsPerPage: 5,
  page: 1,
};

export const getTableQueryState = (
  tableQuery: TableQueryStateProps,
  searchParams?: ReadonlyURLSearchParams,
) => ({
  order:
    (searchParams?.get('order') as Order) ||
    tableQuery?.order ||
    TABLE_QUERY_STATE_DEFAULT_VALUE.order,
  orderBy:
    searchParams?.get('orderBy') ||
    tableQuery?.orderBy ||
    TABLE_QUERY_STATE_DEFAULT_VALUE.orderBy,
  rowsPerPage:
    Number(searchParams?.get('rowsPerPage')) ||
    tableQuery?.rowsPerPage ||
    TABLE_QUERY_STATE_DEFAULT_VALUE.rowsPerPage,
  page:
    Number(searchParams?.get('page')) ||
    tableQuery?.page ||
    TABLE_QUERY_STATE_DEFAULT_VALUE.page,
  simpleFilter:
    (searchParams?.get('simpleFilter') &&
      JSON.parse(searchParams.get('simpleFilter'))) ||
    tableQuery?.simpleFilter ||
    undefined,
  search:
    (searchParams?.get('search') && JSON.parse(searchParams.get('search'))) ||
    tableQuery?.search ||
    undefined,
});

export const useTableQueryState = (tableQuery?: TableQueryStateProps) => {
  const searchParams = useSearchParams();

  const [tableQueryState, setTableQueryState] = useState<TableQueryStateProps>(
    getTableQueryState(tableQuery, searchParams),
  );

  return {
    tableQueryState,
    setTableQueryState,
  };
};
