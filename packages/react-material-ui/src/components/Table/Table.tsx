'use client';

import React, { PropsWithChildren } from 'react';
import { TableProps as MUITableProps } from '@mui/material';
import { Table as MUITable, TableProps as TableStylesProps } from './styles';

export type TableProps = {
  variant?: TableStylesProps['variant'];
} & Omit<MUITableProps, 'variant'>;

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
  <MUITable sx={{ minWidth: 750 }} size="medium" variant={variant} {...rest}>
    {children}
  </MUITable>
);
