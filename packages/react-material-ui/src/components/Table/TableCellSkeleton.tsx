'use client';

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import { useTableRoot } from './hooks/useTableRoot';

/**
 * TableCellSkeleton component represents skeleton cells in a table row.
 *
 * @returns A React element representing the table cell skeleton.
 */
export const TableCellSkeleton = () => {
  const { headers } = useTableRoot();

  return (
    <>
      {headers.map((header) => {
        if (header.hide) return null;

        return (
          <TableCell key={header.id}>
            <Skeleton height={32} width={header.width} />
          </TableCell>
        );
      })}
    </>
  );
};
