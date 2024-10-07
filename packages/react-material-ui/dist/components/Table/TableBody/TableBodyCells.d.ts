/// <reference types="react" />
import { TableCellProps } from '@mui/material';
import { RowProps } from '../types';
type TableBodyCellsProps = {
    row: RowProps;
} & TableCellProps;
export declare const TableBodyCells: ({ row, ...rest }: TableBodyCellsProps) => JSX.Element;
export {};
