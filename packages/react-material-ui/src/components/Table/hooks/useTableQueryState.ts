import { useSearchParams } from 'next/navigation';
import { Order, TableQueryStateProps } from '../types';
import { useState } from 'react';

export const useTableQueryState = (tableQuery?: TableQueryStateProps) => {
  const searchParams = useSearchParams();

  const [tableState, setTableState] = useState<TableQueryStateProps>({
    order: (searchParams.get('order') as Order) || tableQuery?.order || 'asc',
    orderBy: searchParams.get('orderBy') || tableQuery?.orderBy || 'id',
    rowsPerPage:
      Number(searchParams.get('rowsPerPage')) || tableQuery?.rowsPerPage || 5,
    page: Number(searchParams.get('page')) || tableQuery?.page || 1,
  });

  return {
    tableState,
    setTableState,
  };
};
