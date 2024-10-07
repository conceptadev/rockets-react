/// <reference types="react" />
import { Order, TableQueryStateProps } from '../types';
export declare const TABLE_QUERY_STATE_DEFAULT_VALUE: TableQueryStateProps;
export declare const getTableQueryState: (tableQuery: TableQueryStateProps, searchParams?: URLSearchParams) => {
    order: Order;
    orderBy: string;
    rowsPerPage: number;
    page: number;
    simpleFilter: any;
    search: any;
};
export declare const useTableQueryState: (tableQuery?: TableQueryStateProps) => {
    tableQueryState: TableQueryStateProps;
    setTableQueryState: import("react").Dispatch<import("react").SetStateAction<TableQueryStateProps>>;
};
