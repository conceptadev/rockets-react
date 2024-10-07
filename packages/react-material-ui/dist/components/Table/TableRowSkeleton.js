"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRowSkeleton = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const TableCellSkeleton_1 = require("./TableCellSkeleton");
const useTableRoot_1 = require("./hooks/useTableRoot");
const TableRowSkeleton = () => {
    const { tableQuery } = (0, useTableRoot_1.useTableRoot)();
    const rowsToRender = Array.from({ length: tableQuery.rowsPerPage }, (_, index) => index + 1);
    return (react_1.default.createElement(react_1.default.Fragment, null, rowsToRender.map((item) => (react_1.default.createElement(material_1.TableRow, { key: item },
        react_1.default.createElement(TableCellSkeleton_1.TableCellSkeleton, null))))));
};
exports.TableRowSkeleton = TableRowSkeleton;
//# sourceMappingURL=TableRowSkeleton.js.map