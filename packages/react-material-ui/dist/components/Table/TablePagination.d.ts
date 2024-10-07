/// <reference types="react" />
import { TablePaginationProps as MuiTablePaginationProps } from '@mui/material';
type TablePaginationProps = {
    variant: 'clean' | 'contained' | 'outlined';
} & Omit<MuiTablePaginationProps, 'variant' | 'page' | 'rowsPerPage' | 'count' | 'onPageChange'>;
export declare const TablePagination: ({ variant, rowsPerPageOptions, sx, ...rest }: TablePaginationProps) => JSX.Element;
export {};
