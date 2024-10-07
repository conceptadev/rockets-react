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
exports.TablePagination = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useTableRoot_1 = require("./hooks/useTableRoot");
const TablePagination = (_a) => {
    var { variant, rowsPerPageOptions = [5, 10, 25], sx } = _a, rest = __rest(_a, ["variant", "rowsPerPageOptions", "sx"]);
    const theme = (0, material_1.useTheme)();
    const { rows, tableQuery, total, handleChangePage, handleChangeRowsPerPage } = (0, useTableRoot_1.useTableRoot)();
    const { rowsPerPage, page } = tableQuery;
    return (react_1.default.createElement(material_1.TablePagination, Object.assign({ rowsPerPageOptions: rowsPerPageOptions, component: "div", count: total || (rows === null || rows === void 0 ? void 0 : rows.length) || 0, rowsPerPage: rowsPerPage, page: page ? page - 1 : 0, onPageChange: (event, page) => handleChangePage(event, page + 1), onRowsPerPageChange: handleChangeRowsPerPage }, rest, { sx: [
            Object.assign({}, (variant === 'outlined' && {
                backgroundColor: theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[800],
                border: `solid 1px #e5e7eb`,
                borderTop: 'none',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                borderLeftStyle: 'solid',
                borderRightStyle: 'solid',
            })),
            ...(Array.isArray(sx) ? sx : [sx]),
        ], "data-testid": "table-pagination" })));
};
exports.TablePagination = TablePagination;
//# sourceMappingURL=TablePagination.js.map