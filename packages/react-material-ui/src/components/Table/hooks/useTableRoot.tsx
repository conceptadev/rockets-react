'use client';

import React, { createContext, useContext } from 'react';
import { HeaderProps, RowProps, TableQueryStateProps } from '../types';

type TableContextProps = {
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  rows: RowProps[];
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  headers: HeaderProps[];
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  total: number;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  isControlled: boolean;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  pageCount: number;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  tableQuery: TableQueryStateProps;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  selected: RowProps[];
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  setHeaders: React.Dispatch<React.SetStateAction<HeaderProps[]>>;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  isSelected: (id: string) => boolean;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  handleChangePage: (event: unknown, newPage: number) => void;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  handleSort: (event: React.MouseEvent<unknown>, property: string) => void;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  handleSelectAllCheckboxes: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
  handleSelectCheckboxItem: (
    event: React.MouseEvent<unknown>,
    row: RowProps,
  ) => void;
  /**
   * Hook that wraps the implementation of the Table Root Context.
   */
};

export const TableContext = createContext<TableContextProps>(
  {} as TableContextProps,
);

/**
 * Hook that wraps the implementation of the Table Root Context.
 */
export const useTableRoot = () => {
  const tableRootContext = useContext(TableContext);

  if (!tableRootContext) {
    throw new Error('You must use table root under TableRootContext');
  }

  return tableRootContext;
};
