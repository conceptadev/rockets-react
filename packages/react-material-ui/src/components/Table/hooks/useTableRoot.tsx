'use client';

import React, { createContext, useContext } from 'react';
import { HeaderProps, RowProps, TableStateProps } from '../types';

type TableContextProps = {
  rows: RowProps[];
  headers: HeaderProps[];
  total: number;
  isControlled: boolean;
  pageCount: number;
  tableState: TableStateProps;
  selected: RowProps[];
  isSelected: (id: string) => boolean;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (event: React.MouseEvent<unknown>, property: string) => void;
  handleSelectAllCheckboxes: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSelectCheckboxItem: (
    event: React.MouseEvent<unknown>,
    row: RowProps,
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
