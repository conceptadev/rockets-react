/// <reference types="react" />
import { TableCellProps } from '@mui/material';
import { RowProps } from '../types';
type TableBodyCheckboxProps = {
    row: RowProps;
    labelId: string;
};
export declare const TableBodyCheckbox: ({ row, labelId, ...rest }: TableBodyCheckboxProps & TableCellProps) => JSX.Element;
export {};
