'use client';

import React from 'react';
import TableRow from '@mui/material/TableRow';

import { TableCellSkeleton } from './TableCellSkeleton';
import { useTableRoot } from './hooks/useTableRoot';

/**
 * TableRowSkeleton component represents a row of skeleton cells in a table.
 *
 * @returns A React element representing the table row skeleton.
 */
export const TableRowSkeleton = () => {
  const { tableQuery } = useTableRoot();

  const rowsToRender = Array.from(
    { length: tableQuery.rowsPerPage },
    (_, index) => index + 1,
  );

  return (
    <>
      {rowsToRender.map((item) => (
        <TableRow key={item}>
          <TableCellSkeleton />
        </TableRow>
      ))}
    </>
  );
};
