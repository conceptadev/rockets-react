import React, { ReactNode } from 'react';
import Text from '../../Text';
import { TableCell, TableCellProps, Tooltip } from '@mui/material';
import get from 'lodash/get';

import { CustomTableCell, RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';
import { isMobile } from '../../../utils/isMobile';

const renderTextCell = (value: string | number | null) => (
  <Text fontSize={14} fontWeight={400} color="text.primary">
    {value ?? ''}
  </Text>
);

const renderCell = (row: RowProps, dataOrigin: string): ReactNode => {
  const cell: CustomTableCell | string | number | undefined = get(
    row,
    dataOrigin,
  );

  if (!cell) return null;

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
        if (isMobile && header.hideOnMobile) return null;

        return (
          <TableCell key={header.id} {...rest}>
            {renderCell(row, header.source || header.id)}
          </TableCell>
        );
      })}
    </>
  );
};
