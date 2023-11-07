'use client';

import React from 'react';
import Text from '../../Text';
import { TableCell, TableCellProps, Tooltip } from '@mui/material';
import { CustomTableCell, RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

const getCellData = (cell: CustomTableCell | string | number) => {
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

  if (!('title' in cell)) {
    return (
      <Text fontSize={14} fontWeight={400} color="text.primary">
        {cell.value ?? ''}
      </Text>
    );
  }

  if ('title' in cell) {
    return (
      <Tooltip title={cell.title}>
        <span>{cell.value ?? ''}</span>
      </Tooltip>
    );
  }

  if ('component' in cell) {
    return cell.component;
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
      {headers.map((hd) => {
        return (
          <TableCell key={hd.id} {...rest}>
            {getCellData(row[hd.id])}
          </TableCell>
        );
      })}
    </>
  );
};
