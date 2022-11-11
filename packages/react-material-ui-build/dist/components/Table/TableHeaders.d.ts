import React, { FC } from 'react';
import { HeadersProps, Order } from './Table';
interface Props {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headers: HeadersProps[];
    hasCheckboxes?: boolean;
    hasOptions?: boolean;
}
declare const TableHeaders: FC<Props>;
export default TableHeaders;
