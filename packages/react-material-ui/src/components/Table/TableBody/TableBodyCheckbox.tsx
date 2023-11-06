import React from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { RowsProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

type TableBodyCheckboxProps = {
  row: RowsProps;
  labelId: string;
};

/**
 * Represents a table cell with a checkbox input within the body of a table component.
 *
 * @param {TableBodyCheckboxProps} props - The props for the TableBodyCheckbox component.
 * @returns A React element representing the table body cell with a checkbox input.
 */
export const TableBodyCheckbox = ({ row, labelId }: TableBodyCheckboxProps) => {
  const { isSelected, handleSelectCheckboxItem } = useTableRoot();
  const isItemSelected = isSelected(row.id);

  return (
    <TableCell padding="checkbox">
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
