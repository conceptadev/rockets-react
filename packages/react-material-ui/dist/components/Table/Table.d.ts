import { FC, ReactNode } from 'react';
import { TableProps } from './Styles';
export declare type HeadersProps = {
    disablePadding?: boolean;
    id: string;
    label: string;
    numeric?: boolean;
    textAlign?: 'left' | 'center' | 'right';
};
export declare type CustomTableCell = {
    sortableValue?: string | number;
    component: ReactNode;
};
export declare type RowsProps = {
    id: string;
    [key: string]: string | number | CustomTableCell;
};
export declare type SelectedRows = {
    selectedRows: RowsProps[];
};
export declare type CustomRowOptionsProps = {
    row: RowsProps;
    close: () => void;
};
export declare type SimpleActionButton = {
    key: string;
    onClick: ({ selectedRows }: SelectedRows) => void;
    renderItem: ReactNode;
};
export declare type SimpleOptionButton = {
    key: string;
    onClick: (row: RowsProps) => void;
    text?: string;
    icon?: ReactNode;
};
declare type Props = {
    rows: RowsProps[];
    headers: HeadersProps[];
    hasCheckboxes?: boolean;
    hasOptions?: boolean;
    customToolbarActionButtons?: SimpleActionButton[] | (({ selectedRows }: SelectedRows) => void);
    customRowOptions?: SimpleOptionButton[] | (({ row, close }: CustomRowOptionsProps) => ReactNode);
    variant?: TableProps['variant'];
    toggleDirection?: 'horizontal' | 'vertical';
};
export declare type Order = 'asc' | 'desc';
declare const TableComponent: FC<Props>;
export default TableComponent;
