import { ReactNode } from 'react';
import { HeaderProps } from '../types';
type TableHeaderCellsProps = {
    renderCell?: (cell: HeaderProps) => ReactNode;
};
export declare const TableHeaderCells: ({ renderCell }: TableHeaderCellsProps) => JSX.Element;
export {};
