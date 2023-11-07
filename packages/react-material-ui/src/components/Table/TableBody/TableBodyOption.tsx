'use client';

import React, { ReactNode } from 'react';
import { CustomRowOptionsProps, RowsProps, SimpleOptionButton } from '../types';
import { TableCell } from '@mui/material';
import TableOptions from '../TableOptions';

type TableBodyOptionProps = {
  row: RowsProps;
  customRowOptions:
    | SimpleOptionButton[]
    | (({ row, close }: CustomRowOptionsProps) => ReactNode);
  toggleDirection: 'horizontal' | 'vertical';
};

/**
 * Represents a table cell with options within the body of a table component.
 *
 * @param {TableBodyOptionProps} props - The props for the TableBodyOption component.
 * @returns A React element representing the table body cell with options.
 */
export const TableBodyOption = ({
  row,
  customRowOptions,
  toggleDirection,
}: TableBodyOptionProps) => {
  return (
    <TableCell>
      <TableOptions
        row={row}
        customRowOptions={customRowOptions}
        toggleDirection={toggleDirection}
      />
    </TableCell>
  );
};
