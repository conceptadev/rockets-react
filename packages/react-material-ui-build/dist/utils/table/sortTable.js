"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const descendingComparator = (a, b) => {
    if (b < a) {
        return -1;
    }
    if (b > a) {
        return 1;
    }
    return 0;
};
const getSortableValue = (item) => {
    if (typeof item === 'number' || typeof item === 'string') {
        return item;
    }
    if ('sortableValue' in item && item.sortableValue) {
        return item.sortableValue;
    }
    return 0;
};
const getComparator = (a, b, order, orderBy) => {
    const aVal = getSortableValue(a[orderBy]);
    const bVal = getSortableValue(b[orderBy]);
    return order === 'desc'
        ? descendingComparator(aVal, bVal)
        : -descendingComparator(aVal, bVal);
};
exports.default = getComparator;
//# sourceMappingURL=sortTable.js.map