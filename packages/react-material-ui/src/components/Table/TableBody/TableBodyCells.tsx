'use client';

import React, { ReactNode } from 'react';
import Text from '../../Text';
import { TableCell, TableCellProps, Tooltip } from '@mui/material';
import { CustomTableCell, RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

const renderTextCell = (value: string | number | null) => (
  <Text fontSize={14} fontWeight={400} color="text.primary">
    {value ?? ''}
  </Text>
);

const renderCell = (
  cell: CustomTableCell | string | number | undefined | null,
): ReactNode => {
  if (cell === null) return null;

  if (typeof cell === 'object') {
    if ('component' in cell) {
      return cell.component;
    }
    if (cell.title) {
      return (
        <Tooltip title={cell.title}>
          <span>{cell.value ?? ''}</span>
        </Tooltip>
      );
    }
    return renderTextCell(cell.value ?? '');
  }

  return renderTextCell(cell);
};

type TableBodyCellsProps = {
  row: RowProps;
} & TableCellProps;

/**
 * Represents a table cell within the body of a table component.
 *
 * @param {TableBodyCellsProps} props - The props for the TableBodyCells component.
 * @returns A React element representing the table body cell.
 */
export const TableBodyCells = ({ row, ...rest }: TableBodyCellsProps) => {
  const { headers } = useTableRoot();

  return (
    <>
      {headers.map((header) => {
        if (header.hide) return null;

        return (
          <TableCell key={header.id} {...rest}>
            {renderCell(row[header.source || header.id])}
          </TableCell>
        );
      })}
    </>
  );
};
