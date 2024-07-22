'use client';

import React, { PropsWithChildren } from 'react';
import { TableProps as MuiTableProps } from '@mui/material/Table';
import { Table as MuiTable, TableProps as TableStylesProps } from './Styles';
import { isMobile } from '../../utils/isMobile';

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
  sx,
  ...rest
}: PropsWithChildren<TableProps>) => (
  <MuiTable
    variant={variant}
    {...rest}
    sx={[
      {
        minWidth: isMobile ? 'auto' : 750,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    data-testid="mui-table"
  >
    {children}
  </MuiTable>
);
