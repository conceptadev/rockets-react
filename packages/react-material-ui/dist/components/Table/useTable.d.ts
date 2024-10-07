/// <reference types="react" />
import { Order, Search, SimpleFilter, UpdateSimpleFilter, TableQueryStateProps } from './types';
import { DataProviderRequestOptions } from '@concepta/react-data-provider/dist/interfaces';
export interface UseTableOptions {
    rowsPerPage?: number;
    page?: number;
    orderBy?: string;
    order?: Order;
    simpleFilter?: SimpleFilter;
    search?: Search;
    callbacks?: DataProviderRequestOptions;
    noPagination?: boolean;
    navigate?: (path: string) => void;
}
export interface UpdateSearch {
    (search: Search | null, resetPage?: boolean): void;
}
export interface UseTableResult {
    data: unknown[];
    isPending: boolean;
    error: unknown;
    total: number;
    pageCount: number;
    execute: () => void;
    refresh: () => void;
    updateSimpleFilter: UpdateSimpleFilter;
    updateSearch: UpdateSearch;
    simpleFilter: SimpleFilter;
    search: Search;
    tableQueryState: TableQueryStateProps;
    setTableQueryState: React.Dispatch<React.SetStateAction<TableQueryStateProps>>;
}
export type UseTableProps = (resource: string, options?: UseTableOptions) => UseTableResult;
declare const useTable: UseTableProps;
export default useTable;
