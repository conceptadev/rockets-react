import React, { createContext, useContext } from 'react';
import { HeadersProps, RowsProps, TableQueryStateProps } from '../types';

type TableContextProps = {
  rows: RowsProps[];
  headers: HeadersProps[];
  total: number;
  pageCount: number;
  tableQuery: TableQueryStateProps;
  selected: RowsProps[];
  isSelected: (id: string) => boolean;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => void;
  handleSelectAllCheckboxes: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSelectCheckboxItem: (
    event: React.MouseEvent<unknown>,
    row: RowsProps,
  ) => void;
};

export const TableContext = createContext<TableContextProps>(
  {} as TableContextProps,
);

export const useTableRoot = () => {
  const tableRootContext = useContext(TableContext);

  if (!tableRootContext) {
    throw new Error('You must use table root under TableRootContext');
  }

  return tableRootContext;
};
