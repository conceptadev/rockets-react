'use client';

import React from 'react';
import Box from '@mui/material/Box';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useTableRoot } from '../hooks/useTableRoot';
import { HeaderProps, Order } from '../types';

type TableHeaderCellProps = {
  cell: HeaderProps;
} & TableCellProps;

/**
 * A component representing a header cell in a table.
 *
 * @param props - The component's properties.
 * @param props.cell - The table header cell configuration.
 * @param props.rest - Additional props to be spread to the TableCell component.
 * @returns A React JSX element representing the header cell.
 */
export const TableHeaderCell = ({ cell, ...rest }: TableHeaderCellProps) => {
  const { tableState, handleSort } = useTableRoot();
  const { order, orderBy } = tableState;

  /**
   * Creates a sort handler function for a specific table column.
   *
   * @param property - The property to sort by.
   * @param event - The mouse event triggering the sorting.
   * @returns {void} - This function doesn't return anything.
   */
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleSort(event, property);
    };

  const isHeaderSortable = cell.sortable ?? true;

  return (
    <TableCell
      key={cell.id}
      width={cell.width}
      align={cell?.textAlign || cell.numeric ? 'right' : 'left'}
      padding={cell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === cell.id ? order : false}
      {...rest}
    >
      {isHeaderSortable ? (
        <TableSortLabel
          active={orderBy === cell.id}
          direction={orderBy === cell.id ? order : Order.Asc}
          onClick={createSortHandler(cell.id)}
        >
          {cell.label}
          {orderBy === cell.id ? (
            <Box component="span" sx={visuallyHidden}>
              {order === Order.Desc ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      ) : (
        <>{cell.label}</>
      )}
    </TableCell>
  );
};
