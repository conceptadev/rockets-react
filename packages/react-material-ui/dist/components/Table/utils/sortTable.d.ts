import { Order, RowProps } from '../types';
declare const getComparator: (a: RowProps, b: RowProps, order: Order, orderBy: string) => number;
export default getComparator;
