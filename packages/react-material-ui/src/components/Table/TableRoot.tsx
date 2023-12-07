'use client';

import React, { PropsWithChildren, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HeaderProps, Order, RowProps, TableStateProps } from './types';
import { useTableState } from './hooks/useTableState';
import { TableContext } from './hooks/useTableRoot';
import { getSearchParams } from '../../utils/http';

type TableRootProps =
  | {
      rows: RowProps[];
      headers: HeaderProps[];
      total?: number;
      pageCount?: never;
      tableState?: never;
      updateTableState?: never;
    }
  | {
      rows: RowProps[];
      headers: HeaderProps[];
      total: number;
      pageCount: number;
      tableState: TableStateProps;
      updateTableState: React.Dispatch<React.SetStateAction<TableStateProps>>;
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
  headers = [],
  total,
  pageCount,
  tableState: controlledTableState,
  updateTableState: controlledUpdateTableState,
  ...rest
}: PropsWithChildren<TableRootProps & BoxProps>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { tableState, setTableState } = useTableState();

  const [selected, setSelected] = useState<RowProps[]>([]);

  const isControlled = !!controlledTableState;
  const handleUpdateTableState = isControlled
    ? controlledUpdateTableState
    : setTableState;

  const { order, orderBy } = isControlled ? controlledTableState : tableState;

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

    handleUpdateTableState((prevState) => ({
      ...prevState,
      ...newRowsPerPageProperties,
    }));

    const newSearchParam = getSearchParams(
      searchParams,
      newRowsPerPageProperties,
    );

    if (newSearchParam) {
      router.replace(`${pathname}?${newSearchParam}`);
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

    handleUpdateTableState((prevState) => ({
      ...prevState,
      ...newPageProperty,
    }));

    const newSearchParam = getSearchParams(searchParams, newPageProperty);

    if (newSearchParam) {
      router.replace(`${pathname}?${newSearchParam}`);
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
    };

    handleUpdateTableState((prevState) => ({
      ...prevState,
      ...newOrderProperties,
    }));
    handleChangePage('', 1);

    const newSearchParam = getSearchParams(searchParams, newOrderProperties);

    if (newSearchParam) {
      router.replace(`${pathname}?${newSearchParam}`);
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
        tableState: isControlled ? controlledTableState : tableState,
        selected,
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
