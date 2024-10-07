"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCellSkeleton = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useTableRoot_1 = require("./hooks/useTableRoot");
const TableCellSkeleton = () => {
    const { headers } = (0, useTableRoot_1.useTableRoot)();
    return (react_1.default.createElement(react_1.default.Fragment, null, headers.map((header) => {
        if (header.hide)
            return null;
        return (react_1.default.createElement(material_1.TableCell, { key: header.id },
            react_1.default.createElement(material_1.Skeleton, { height: 32, width: header.width })));
    })));
};
exports.TableCellSkeleton = TableCellSkeleton;
//# sourceMappingURL=TableCellSkeleton.js.map