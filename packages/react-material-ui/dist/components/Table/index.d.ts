/// <reference types="react" />
import useTable, { UseTableProps, UseTableResult, UseTableOptions, UpdateSearch } from './useTable';
declare const TableComponent: {
    Table: ({ children, variant, sx, ...rest }: import("react").PropsWithChildren<import("./Table").TableProps>) => JSX.Element;
    BodyCell: ({ row, ...rest }: {
        row: import("./types").RowProps;
    } & import("@mui/material").TableCellProps) => JSX.Element;
    BodyCheckboxes: ({ row, labelId, ...rest }: {
        row: import("./types").RowProps;
        labelId: string;
    } & import("@mui/material").TableCellProps) => JSX.Element;
    BodyOption: ({ row, customRowOptions, toggleDirection, }: {
        row: import("./types").RowProps;
        customRowOptions: import("./types").SimpleOptionButton[] | (({ row, close }: import("./types").CustomRowOptionsProps) => import("react").ReactNode);
        toggleDirection: "horizontal" | "vertical";
    }) => JSX.Element;
    BodyRow: ({ row, children, hasCheckboxes, ...rest }: import("react").PropsWithChildren<{
        row: import("./types").RowProps;
        hasCheckboxes?: boolean;
    } & import("@mui/material").TableRowOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>, "ref"> & {
        ref?: import("react").Ref<HTMLTableRowElement>;
    }, "className" | "style" | "children" | "classes" | "sx" | "selected" | "hover"> & {
        component?: import("react").ElementType<any>;
    }>) => JSX.Element;
    BodyRows: ({ renderRow, isLoading, }: {
        renderRow?: import("./types").RenderRowFunction;
        isLoading?: boolean;
    }) => JSX.Element;
    Pagination: ({ variant, rowsPerPageOptions, sx, ...rest }: {
        variant: "outlined" | "contained" | "clean";
    } & Omit<import("@mui/material").TablePaginationProps<import("react").JSXElementConstructor<import("@mui/material").TablePaginationBaseProps>, {}>, "variant" | "page" | "rowsPerPage" | "count" | "onPageChange">) => JSX.Element;
    PaginationNumbers: (props: import("@mui/material").PaginationProps) => JSX.Element;
    HeaderCell: ({ cell, ...rest }: {
        cell: import("./types").HeaderProps;
    } & import("@mui/material").TableCellProps) => JSX.Element;
    HeaderCells: ({ renderCell }: {
        renderCell?: (cell: import("./types").HeaderProps) => import("react").ReactNode;
    }) => JSX.Element;
    HeaderCheckbox: (props: import("@mui/material").TableCellProps) => JSX.Element;
    HeaderOption: () => JSX.Element;
    Root: ({ children, rows, headers: initialHeaders, total, pageCount, tableQueryState: controlledTableQueryState, updateTableQueryState: controlledUpdateTableQueryState, navigate, ...rest }: import("react").PropsWithChildren<import("./TableRoot").TableRootProps & import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
        ref?: import("react").Ref<HTMLDivElement>;
    }, keyof import("@mui/material/OverridableComponent").CommonProps | keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>>>) => JSX.Element;
    CellSkeleton: () => JSX.Element;
    RowSkeleton: () => JSX.Element;
    ColumnOrderable: ({ hasAllOption, text, icon, orderableListCacheKey, cacheApiPath, }: {
        hasAllOption?: boolean;
        text?: string;
        icon?: import("react").ReactNode;
        orderableListCacheKey?: string;
        cacheApiPath?: string;
    }) => JSX.Element;
};
export { useTable, UseTableProps, UseTableResult, UseTableOptions, UpdateSearch, };
export default TableComponent;
