"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHeaderCell = void 0;
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableSortLabel_1 = __importDefault(require("@mui/material/TableSortLabel"));
const utils_1 = require("@mui/utils");
const useTableRoot_1 = require("../hooks/useTableRoot");
const types_1 = require("../types");
const TableHeaderCell = (_a) => {
    var _b;
    var { cell } = _a, rest = __rest(_a, ["cell"]);
    const { tableQuery, handleSort } = (0, useTableRoot_1.useTableRoot)();
    const { order, orderBy } = tableQuery;
    const createSortHandler = (property) => (event) => {
        handleSort(event, property);
    };
    const isHeaderSortable = (_b = cell.sortable) !== null && _b !== void 0 ? _b : true;
    return (react_1.default.createElement(TableCell_1.default, Object.assign({ key: cell.id, width: cell.width, align: (cell === null || cell === void 0 ? void 0 : cell.textAlign) || cell.numeric ? 'right' : 'left', padding: cell.disablePadding ? 'none' : 'normal', sortDirection: orderBy === cell.id ? order : false }, rest), isHeaderSortable ? (react_1.default.createElement(TableSortLabel_1.default, { active: orderBy === cell.id, direction: orderBy === cell.id ? order : types_1.Order.Asc, onClick: createSortHandler(cell.id) },
        cell.label,
        orderBy === cell.id ? (react_1.default.createElement(Box_1.default, { component: "span", sx: utils_1.visuallyHidden }, order === types_1.Order.Desc ? 'sorted descending' : 'sorted ascending')) : null)) : (react_1.default.createElement(react_1.default.Fragment, null, cell.label))));
};
exports.TableHeaderCell = TableHeaderCell;
//# sourceMappingURL=TableHeaderCell.js.map