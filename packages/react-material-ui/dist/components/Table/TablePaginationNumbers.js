"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablePaginationNumbers = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useTableRoot_1 = require("./hooks/useTableRoot");
const TablePaginationNumbers = (props) => {
    const { rows, pageCount, handleChangePage, tableQuery } = (0, useTableRoot_1.useTableRoot)();
    const { page } = tableQuery;
    return (react_1.default.createElement(material_1.Box, { display: "flex", justifyContent: "center" },
        react_1.default.createElement(material_1.Pagination, Object.assign({ count: pageCount || ((rows === null || rows === void 0 ? void 0 : rows.length) && Math.ceil((rows === null || rows === void 0 ? void 0 : rows.length) / 5)) || 0, onChange: handleChangePage, page: page, "data-testid": "table-pagination" }, props))));
};
exports.TablePaginationNumbers = TablePaginationNumbers;
//# sourceMappingURL=TablePaginationNumbers.js.map