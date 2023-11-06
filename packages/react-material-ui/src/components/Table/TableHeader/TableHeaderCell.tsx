import React from 'react';
import Box from '@mui/material/Box';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useTableRoot } from '../hooks/useTableRoot';

/**
 * Represents a table header cell component for rendering sortable table headers.
 *
 * @param {TableCellProps} props - The props for the TableHeaderCell component.
 * @returns An array of React elements representing the table header cells.
 */
export const TableHeaderCell = (props: TableCellProps) => {
  const { headers, tableQuery, handleRequestSort } = useTableRoot();
  const { order, orderBy } = tableQuery;

  /**
   * Creates a sort handler function for a specific table column.
   *
   * @param property - The property to sort by.
   * @param event - The mouse event triggering the sorting.
   * @returns {void} - This function doesn't return anything.
   */
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return headers.map((headCell) => (
    <TableCell
      key={headCell.id}
      align={headCell?.textAlign || headCell.numeric ? 'right' : 'left'}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === headCell.id ? order : false}
      {...props}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  ));
};
