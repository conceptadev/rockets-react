'use client';

import React from 'react';
import { Checkbox, TableCell, TableCellProps } from '@mui/material';
import { useTableRoot } from '../hooks/useTableRoot';

/**
 * Represents a table header cell with a checkbox input for selecting all rows.
 *
 * @returns  A React element representing the table header cell with a checkbox input.
 */
export const TableHeaderCheckbox = (props: TableCellProps) => {
  const { rows, selected, handleSelectAllCheckboxes } = useTableRoot();

  const numSelected = selected.length;
  const rowCount = rows.length;

  return (
    <TableCell padding="checkbox" {...props}>
      <Checkbox
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={handleSelectAllCheckboxes}
        inputProps={{
          'aria-label': 'select all',
        }}
      />
    </TableCell>
  );
};
