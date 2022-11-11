"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
exports.default = stableSort;
//# sourceMappingURL=stableSort.js.map