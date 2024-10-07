/// <reference types="react" />
import { Order, RenderRowFunction, RowProps } from '../types';
export declare const getPaginatedRows: (rows: RowProps[], page: number, rowsPerPage: number, order: Order, orderBy: string) => RowProps[];
type TableBodyRowProps = {
    renderRow?: RenderRowFunction;
    isLoading?: boolean;
};
export declare const TableBodyRows: ({ renderRow, isLoading, }: TableBodyRowProps) => JSX.Element;
export {};
