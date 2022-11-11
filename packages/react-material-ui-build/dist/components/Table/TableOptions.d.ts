import { FC, ReactNode } from 'react';
import { RowsProps, SimpleOptionButton, CustomRowOptionsProps } from '../Table/Table';
declare type Props = {
    row: RowsProps;
    customRowOptions?: SimpleOptionButton[] | (({ row, close }: CustomRowOptionsProps) => ReactNode);
    toggleDirection?: 'horizontal' | 'vertical';
};
declare const TableOptions: FC<Props>;
export default TableOptions;
