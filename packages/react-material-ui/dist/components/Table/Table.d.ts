import { PropsWithChildren } from 'react';
import { TableProps as MuiTableProps } from '@mui/material';
import { TableProps as TableStylesProps } from './Styles';
export type TableProps = {
    variant?: TableStylesProps['variant'];
} & Omit<MuiTableProps, 'variant'>;
export declare const Table: ({ children, variant, sx, ...rest }: PropsWithChildren<TableProps>) => JSX.Element;
