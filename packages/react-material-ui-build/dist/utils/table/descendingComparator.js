"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
exports.default = descendingComparator;
//# sourceMappingURL=descendingComparator.js.map