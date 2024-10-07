import { ReactNode } from 'react';
import { CustomRowOptionsProps, RowProps, SimpleOptionButton } from '../types';
type TableBodyOptionProps = {
    row: RowProps;
    customRowOptions: SimpleOptionButton[] | (({ row, close }: CustomRowOptionsProps) => ReactNode);
    toggleDirection: 'horizontal' | 'vertical';
};
export declare const TableBodyOption: ({ row, customRowOptions, toggleDirection, }: TableBodyOptionProps) => JSX.Element;
export {};
