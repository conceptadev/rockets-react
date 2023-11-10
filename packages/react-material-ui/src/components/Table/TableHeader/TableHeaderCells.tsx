'use client';

import React, { ReactNode } from 'react';
import { useTableRoot } from '../hooks/useTableRoot';
import { TableHeaderCell } from './TableHeaderCell';
import { HeaderProps } from '../types';

type TableHeaderCellsProps = {
  renderCell?: (cell: HeaderProps) => ReactNode;
};

/**
 * Represents a table header cell component for rendering sortable table headers.
 *
 * @param {TableCellProps} props - The props for the TableHeaderCell component.
 * @returns An array of React elements representing the table header cells.
 */
export const TableHeaderCells = ({ renderCell }: TableHeaderCellsProps) => {
  const { headers } = useTableRoot();

  if (!renderCell) {
    return headers.map((header) => <TableHeaderCell cell={header} />);
  }

  return headers.map((header) => {
    return renderCell(header);
  });
};
