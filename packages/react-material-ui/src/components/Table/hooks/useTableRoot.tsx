import React, { createContext, useContext } from 'react';
import { HeaderProps, RowProps, TableQueryStateProps } from '../types';

export type TableContextProps = {
  /**
   * Array of objects, where each contain the data displayed in Table rows.
   */
  rows: RowProps[];
  /**
   * Array of objects that represent the Table columns.
   */
  headers: HeaderProps[];
  /**
   * Total of items displayed in the Table.
   */
  total: number;
  /**
   * Boolean value that indicates if the Table state can be controlled by external sources.
   */
  isControlled: boolean;
  /**
   * Total of pages rendered by the Table.
   */
  pageCount: number;
  /**
   * Table state containing page, order and search properties.
   */
  tableQuery: TableQueryStateProps;
  /**
   * Array of selected rows when checkboxes are available.
   */
  selected: RowProps[];
  /**
   * Callback for changing Table columns dinamically.
   */
  setHeaders: React.Dispatch<React.SetStateAction<HeaderProps[]>>;
  /**
   * Cllback for checking whether a row with the given ID is selected.
   *
   * @param id - The ID of the row to check.
   * @returns `true` if the row is selected, `false` otherwise.
   */
  isSelected: (id: string) => boolean;
  /**
   * Callback for changing the current page in the Table pagination.
   *
   * @param event - The event representing the page change.
   * @param newPage - The new page number.
   */
  handleChangePage: (event: unknown, newPage: number) => void;
  /**
   * Callback for changing the quantity of rows per page in the Table pagination.
   *
   * @param event - The event representing the value change.
   */
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback for changing the current Table sort by a specific column.
   *
   * @param event - The mouse event triggering the sorting request.
   * @param property - The property by which to sort the table.
   */
  handleSort: (event: React.MouseEvent<unknown>, property: string) => void;
  /**
   * Callback for selecting all checkboxes for rows in the Table.
   *
   * @param event - The event representing the checkbox selection change.
   */
  handleSelectAllCheckboxes: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * Callback for selecting a checkbox for a specific row in the table.
   *
   * @param event - The mouse event triggering the checkbox selection.
   * @param row - The row for which the checkbox is being selected.
   */
  handleSelectCheckboxItem: (
    event: React.MouseEvent<unknown>,
    row: RowProps,
  ) => void;
};

export const TableContext = createContext<TableContextProps>(
  {} as TableContextProps,
);

/**
 * Custom hook that wraps the implementation of the Table Root context.
 */
export const useTableRoot = () => {
  const tableRootContext = useContext(TableContext);

  if (!tableRootContext) {
    throw new Error('You must use table root under TableRootContext');
  }

  return tableRootContext;
};
