import React, { PropsWithChildren } from 'react';
import { BoxProps } from '@mui/material';
import { HeaderProps, RowProps, TableQueryStateProps } from './types';
export type TableRootProps = {
    rows: RowProps[];
    headers: HeaderProps[];
    total?: number;
    pageCount?: never;
    tableQueryState?: never;
    updateTableQueryState?: never;
    navigate?: (path: string) => void;
} | {
    rows: RowProps[];
    headers: HeaderProps[];
    total: number;
    pageCount: number;
    tableQueryState: TableQueryStateProps;
    updateTableQueryState: React.Dispatch<React.SetStateAction<TableQueryStateProps>>;
    navigate?: (path: string) => void;
};
export declare const TableRoot: ({ children, rows, headers: initialHeaders, total, pageCount, tableQueryState: controlledTableQueryState, updateTableQueryState: controlledUpdateTableQueryState, navigate, ...rest }: PropsWithChildren<TableRootProps & BoxProps>) => JSX.Element;
