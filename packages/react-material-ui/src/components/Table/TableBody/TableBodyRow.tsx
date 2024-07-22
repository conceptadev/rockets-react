'use client';

import React, { PropsWithChildren } from 'react';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import { RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

type TableBodyRowProps = {
  row: RowProps;
  hasCheckboxes?: boolean;
} & TableRowProps;

/**
 * Represents a table row within the body of a table component.
 *
 * @param {PropsWithChildren<TableBodyRowProps>} props - The props for the TableBodyRow component.
 * @returns A React element representing the table row.
 */
export const TableBodyRow = ({
  row,
  children,
  hasCheckboxes = false,
  ...rest
}: PropsWithChildren<TableBodyRowProps>) => {
  const { isSelected, handleSelectCheckboxItem } = useTableRoot();

  const isItemSelected = isSelected(row.id);

  return (
    <TableRow
      onClick={
        hasCheckboxes
          ? (event) => handleSelectCheckboxItem(event, row)
          : undefined
      }
      role={hasCheckboxes ? 'checkbox' : ''}
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      {...rest}
    >
      {children}
    </TableRow>
  );
};
