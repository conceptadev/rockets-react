/// <reference types="react" />
import { TableCellProps } from '@mui/material/TableCell';
import { HeaderProps } from '../types';
type TableHeaderCellProps = {
    cell: HeaderProps;
} & TableCellProps;
export declare const TableHeaderCell: ({ cell, ...rest }: TableHeaderCellProps) => JSX.Element;
export {};
