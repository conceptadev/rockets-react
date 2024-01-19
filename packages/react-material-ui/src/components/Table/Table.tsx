'use client';

import React, { PropsWithChildren } from 'react';
import { TableProps as MuiTableProps } from '@mui/material';
import { Table as MuiTable, TableProps as TableStylesProps } from './styles';

export type TableProps = {
  variant?: TableStylesProps['variant'];
} & Omit<MuiTableProps, 'variant'>;

/**
 * Represents a table component that provides a common layout for displaying tabular data.
 *
 * @param {TableProps} props - The props for the Table component.
 * @returns A React element representing the table.
 */
export const Table = ({
  children,
  variant = 'contained',
  ...rest
}: PropsWithChildren<TableProps>) => (
  <MuiTable
    sx={{ minWidth: 750 }}
    variant={variant}
    {...rest}
    data-testid="mui-table"
  >
    {children}
  </MuiTable>
);
