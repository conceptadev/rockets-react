import { PropsWithChildren } from 'react';
interface TableToolbarProps {
    numSelected: number;
}
declare const TableToolbar: ({ numSelected, children, }: PropsWithChildren<TableToolbarProps>) => JSX.Element;
export default TableToolbar;
