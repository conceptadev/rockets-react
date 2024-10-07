import { PropsWithChildren } from 'react';
import { TableRowProps } from '@mui/material';
import { RowProps } from '../types';
type TableBodyRowProps = {
    row: RowProps;
    hasCheckboxes?: boolean;
} & TableRowProps;
export declare const TableBodyRow: ({ row, children, hasCheckboxes, ...rest }: PropsWithChildren<TableBodyRowProps>) => JSX.Element;
export {};
