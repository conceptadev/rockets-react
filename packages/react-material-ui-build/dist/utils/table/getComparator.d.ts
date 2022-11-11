declare type Order = 'asc' | 'desc';
declare function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: {
    [key in Key]: number | string;
}, b: {
    [key in Key]: number | string;
}) => number;
export default getComparator;
