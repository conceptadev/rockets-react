'use client';

import React from 'react';
import { Box, Pagination, PaginationProps } from '@mui/material';
import { useTableRoot } from './hooks/useTableRoot';

/**
 * Represents a component for rendering pagination numbers for a table.
 *
 * @param {PaginationProps} props - The props for the TablePaginationNumbers component.
 * @returns A React element representing the table pagination numbers.
 */
export const TablePaginationNumbers = (props: PaginationProps) => {
  const { rows, pageCount, handleChangePage, tableState } = useTableRoot();

  const { page } = tableState;

  return (
    <Box display="flex" justifyContent="center">
      <Pagination
        count={pageCount || (rows?.length && Math.ceil(rows?.length / 5)) || 0}
        onChange={handleChangePage}
        page={page}
        {...props}
      />
    </Box>
  );
};
