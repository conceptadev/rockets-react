import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { Order, TableStateProps } from '../types';
import { useState } from 'react';

export const TABLE_STATE_DEFAULT_VALUE: TableStateProps = {
  order: Order.Asc,
  orderBy: 'id',
  rowsPerPage: 5,
  page: 1,
};

export const getTableState = (
  initialState: TableStateProps,
  searchParams?: ReadonlyURLSearchParams,
) => ({
  order:
    (searchParams?.get('order') as Order) ||
    initialState?.order ||
    TABLE_STATE_DEFAULT_VALUE.order,
  orderBy:
    searchParams?.get('orderBy') ||
    initialState?.orderBy ||
    TABLE_STATE_DEFAULT_VALUE.orderBy,
  rowsPerPage:
    Number(searchParams?.get('rowsPerPage')) ||
    initialState?.rowsPerPage ||
    TABLE_STATE_DEFAULT_VALUE.rowsPerPage,
  page:
    Number(searchParams?.get('page')) ||
    initialState?.page ||
    TABLE_STATE_DEFAULT_VALUE.page,
});

export const useTableState = (initialState?: TableStateProps) => {
  const searchParams = useSearchParams();

  // In this state, we don't want the strings
  // We want the values in the interface that nestjs provides
  const [tableState, setTableState] = useState<TableStateProps>(
    getTableState(initialState, searchParams),
  );

  return {
    tableState,
    setTableState,
  };
};
