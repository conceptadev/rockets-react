import React, { PropsWithChildren, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { HeaderProps, Order, RowProps, TableQueryStateProps } from './types';
import { useTableQueryState } from './hooks/useTableQueryState';
import { TableContext } from './hooks/useTableRoot';
import { getSearchParams } from '../../utils/http';

export type TableRootProps =
  | {
      rows: RowProps[];
      headers: HeaderProps[];
      total?: number;
      pageCount?: never;
      tableQueryState?: never;
      updateTableQueryState?: never;
      navigate?: (path: string) => void;
    }
  | {
      rows: RowProps[];
      headers: HeaderProps[];
      total: number;
      pageCount: number;
      tableQueryState: TableQueryStateProps;
      updateTableQueryState: React.Dispatch<
        React.SetStateAction<TableQueryStateProps>
      >;
      navigate?: (path: string) => void;
    };

/**
 * Represents a container component for managing table-related data and behaviors.
 *
 * @param {TableRootProps} props - The props for the TableRoot component.
 * @returns A React element representing the table root container.
 */
export const TableRoot = ({
  children,
  rows = [],
  headers: initialHeaders = [],
  total,
  pageCount,
  tableQueryState: controlledTableQueryState,
  updateTableQueryState: controlledUpdateTableQueryState,
  navigate,
  ...rest
}: PropsWithChildren<TableRootProps & BoxProps>) => {
  const searchParams = new URLSearchParams(window.location.search);
  const { tableQueryState, setTableQueryState } = useTableQueryState();

  const [selected, setSelected] = useState<RowProps[]>([]);
  const [headers, setHeaders] = useState<HeaderProps[]>(initialHeaders);

  const isControlled = !!controlledTableQueryState;
  const handleUpdateTableQuery = isControlled
    ? controlledUpdateTableQueryState
    : setTableQueryState;

  const { order, orderBy } = isControlled
    ? controlledTableQueryState
    : tableQueryState;

  /**
   * Handles the change of the number of rows displayed per page in the table.
   *
   * @param event - The event representing the row per page change.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPageProperties = {
      rowsPerPage: parseInt(event.target.value, 10),
      page: 1,
    };

    handleUpdateTableQuery((prevState) => ({
      ...prevState,
      ...newRowsPerPageProperties,
    }));

    const newSearchParam = getSearchParams(
      searchParams,
      newRowsPerPageProperties,
    );

    if (newSearchParam) {
      navigate && navigate(`${window.location.pathname}?${newSearchParam}`);
    }
  };

  /**
   * Handles the selection of all checkboxes for rows in the table.
   *
   * @param event - The event representing the checkbox selection change.
   */
  const handleSelectAllCheckboxes = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setSelected(rows);
      return;
    }
    setSelected([]);
  };

  /**
   * Checks whether a row with the given ID is selected.
   *
   * @param id - The ID of the row to check.
   * @returns `true` if the row is selected, `false` otherwise.
   */
  const isSelected = (id: string) =>
    selected.findIndex((_row) => _row.id === id) !== -1;

  /**
   * Handles the selection of a checkbox for a specific row in the table.
   *
   * @param event - The mouse event triggering the checkbox selection.
   * @param row - The row for which the checkbox is being selected.
   */
  const handleSelectCheckboxItem = (
    event: React.MouseEvent<unknown>,
    row: RowProps,
  ) => {
    const selectedIndex = selected.findIndex((_row) => _row.id === row.id);
    let newSelected: RowProps[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  /**
   * Handles the change of the current page in the table's pagination.
   *
   * @param event - The event representing the page change.
   * @param newPage - The new page number.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    const newPageProperty = {
      page: newPage,
    };

    handleUpdateTableQuery((prevState) => ({
      ...prevState,
      ...newPageProperty,
    }));

    setSelected([]);

    const newSearchParam = getSearchParams(searchParams, newPageProperty);

    if (newSearchParam) {
      navigate && navigate(`${window.location.pathname}?${newSearchParam}`);
    }
  };

  /**
   * Handles the request to sort the table by a specific column.
   *
   * @param event - The mouse event triggering the sorting request.
   * @param property - The property by which to sort the table.
   */
  const handleSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === Order.Asc;

    const newOrderProperties = {
      order: isAsc ? Order.Desc : Order.Asc,
      orderBy: property,
      page: 1,
    };

    handleUpdateTableQuery((prevState) => ({
      ...prevState,
      ...newOrderProperties,
    }));

    const newSearchParam = getSearchParams(searchParams, newOrderProperties);

    if (newSearchParam) {
      navigate && navigate(`${window.location.pathname}?${newSearchParam}`);
    }
  };

  return (
    <TableContext.Provider
      value={{
        rows,
        headers,
        total,
        pageCount,
        isControlled,
        tableQuery: isControlled ? controlledTableQueryState : tableQueryState,
        selected,
        setHeaders,
        isSelected,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSort,
        handleSelectAllCheckboxes,
        handleSelectCheckboxItem,
      }}
    >
      <Box width="100%" {...rest}>
        {children}
      </Box>
    </TableContext.Provider>
  );
};
