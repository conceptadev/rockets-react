import { ReactNode } from 'react';
import { CustomRowOptionsProps, RowProps, SimpleOptionButton } from './types';
type TableOptionsProps = {
    row: RowProps;
    customRowOptions?: SimpleOptionButton[] | (({ row, close }: CustomRowOptionsProps) => ReactNode);
    toggleDirection?: 'horizontal' | 'vertical';
};
declare const TableOptions: ({ row, customRowOptions, toggleDirection, }: TableOptionsProps) => JSX.Element;
export default TableOptions;
