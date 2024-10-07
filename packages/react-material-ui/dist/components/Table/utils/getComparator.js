"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const descendingComparator_1 = __importDefault(require("./descendingComparator"));
function getComparator(order, orderBy) {
    return order === types_1.Order.Desc
        ? (a, b) => (0, descendingComparator_1.default)(a, b, orderBy)
        : (a, b) => -(0, descendingComparator_1.default)(a, b, orderBy);
}
exports.default = getComparator;
//# sourceMappingURL=getComparator.js.map