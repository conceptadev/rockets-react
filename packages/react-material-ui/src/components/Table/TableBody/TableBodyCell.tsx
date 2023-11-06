import React from 'react';
import Text from '../../Text';
import { TableCell, TableCellProps } from '@mui/material';
import { CustomTableCell, RowsProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

const getCellData = (cell: CustomTableCell | string | number) => {
  if (typeof cell === 'number' || typeof cell === 'string') {
    return (
      <Text fontSize={14} fontWeight={400} color="text.primary">
        {cell}
      </Text>
    );
  }

  if ('component' in cell && typeof cell.sortableValue !== 'undefined') {
    return cell.component;
  }
};

type TableBodyCellProps = {
  row: RowsProps;
} & TableCellProps;

/**
 * Represents a table cell within the body of a table component.
 *
 * @param {TableBodyCellProps} props - The props for the TableBodyCell component.
 * @returns A React element representing the table body cell.
 */
export const TableBodyCell = ({ row, ...rest }: TableBodyCellProps) => {
  const { headers } = useTableRoot();

  return headers.map((hd) => {
    return (
      <TableCell key={hd.id} {...rest}>
        {getCellData(row[hd.id])}
      </TableCell>
    );
  });
};
