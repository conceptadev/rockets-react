'use client';

import React from 'react';
import { Checkbox, TableCell, TableCellProps } from '@mui/material';
import { RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

type TableBodyCheckboxProps = {
  row: RowProps;
  labelId: string;
};

/**
 * Represents a table cell with a checkbox input within the body of a table component.
 *
 * @param {TableBodyCheckboxProps} props - The props for the TableBodyCheckbox component.
 * @returns A React element representing the table body cell with a checkbox input.
 */
export const TableBodyCheckbox = ({
  row,
  labelId,
  ...rest
}: TableBodyCheckboxProps & TableCellProps) => {
  const { isSelected, handleSelectCheckboxItem } = useTableRoot();
  const isItemSelected = isSelected(row.id);

  return (
    <TableCell padding="checkbox" {...rest}>
      <Checkbox
        color="primary"
        checked={isItemSelected}
        inputProps={{
          'aria-labelledby': labelId,
        }}
        onClick={(event) => handleSelectCheckboxItem(event, row)}
      />
    </TableCell>
  );
};
