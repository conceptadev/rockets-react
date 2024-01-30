'use client';

import React from 'react';
import Text from '../../Text';
import { TableCell, TableCellProps, Tooltip } from '@mui/material';
import { CustomTableCell, RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

const getCellData = (cell: CustomTableCell | string | number | undefined) => {
  if (
    typeof cell === 'number' ||
    typeof cell === 'string' ||
    typeof cell === 'undefined'
  ) {
    return (
      <Text fontSize={14} fontWeight={400} color="text.primary">
        {cell ?? ''}
      </Text>
    );
  }

  if ('component' in cell) {
    return cell.component;
  }

  if (!('title' in cell)) {
    return (
      <Text fontSize={14} fontWeight={400} color="text.primary">
        {cell.value ?? ''}
      </Text>
    );
  } else {
    return (
      <Tooltip title={cell.title}>
        <span>{cell.value ?? ''}</span>
      </Tooltip>
    );
  }
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
        if (header.disabled) return null;

        return (
          <TableCell key={header.id} {...rest}>
            {getCellData(row[header.id])}
          </TableCell>
        );
      })}
    </>
  );
};
