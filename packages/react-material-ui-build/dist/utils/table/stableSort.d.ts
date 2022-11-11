declare function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number): T[];
export default stableSort;
