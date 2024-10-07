"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBodyRows = exports.getPaginatedRows = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
const useTableRoot_1 = require("../hooks/useTableRoot");
const TableBodyRow_1 = require("./TableBodyRow");
const TableBodyCells_1 = require("./TableBodyCells");
const TableRowSkeleton_1 = require("../TableRowSkeleton");
const getPaginatedRows = (rows, page, rowsPerPage, order, orderBy) => rows
    .sort((a, b) => (0, utils_1.sortTable)(a, b, order, orderBy))
    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
exports.getPaginatedRows = getPaginatedRows;
const renderDefaultRow = (row) => (react_1.default.createElement(TableBodyRow_1.TableBodyRow, { key: row.id, row: row },
    react_1.default.createElement(TableBodyCells_1.TableBodyCells, { row: row })));
const renderTableRows = (row, renderRow, labelId) => {
    if (!renderRow) {
        return renderDefaultRow(row);
    }
    return renderRow(row, labelId);
};
const TableBodyRows = ({ renderRow, isLoading = false, }) => {
    const { rows, tableQuery, isControlled } = (0, useTableRoot_1.useTableRoot)();
    const { page, rowsPerPage, order, orderBy } = tableQuery;
    if (isLoading) {
        return react_1.default.createElement(TableRowSkeleton_1.TableRowSkeleton, null);
    }
    if (isControlled) {
        return (react_1.default.createElement(react_1.Fragment, null, rows.map((row, index) => {
            const labelId = `table-checkbox-${index}`;
            return renderTableRows(row, renderRow, labelId);
        })));
    }
    return (react_1.default.createElement(react_1.Fragment, null, (0, exports.getPaginatedRows)(rows, page, rowsPerPage, order, orderBy).map((row, index) => {
        const labelId = `table-checkbox-${index}`;
        return (react_1.default.createElement(react_1.Fragment, { key: row.id }, renderTableRows(row, renderRow, labelId)));
    })));
};
exports.TableBodyRows = TableBodyRows;
//# sourceMappingURL=TableBodyRows.js.map