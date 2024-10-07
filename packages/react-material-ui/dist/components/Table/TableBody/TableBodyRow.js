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
exports.TableBodyRow = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useTableRoot_1 = require("../hooks/useTableRoot");
const TableBodyRow = (_a) => {
    var { row, children, hasCheckboxes = false } = _a, rest = __rest(_a, ["row", "children", "hasCheckboxes"]);
    const { isSelected, handleSelectCheckboxItem } = (0, useTableRoot_1.useTableRoot)();
    const isItemSelected = isSelected(row.id);
    return (react_1.default.createElement(material_1.TableRow, Object.assign({ onClick: hasCheckboxes
            ? (event) => handleSelectCheckboxItem(event, row)
            : undefined, role: hasCheckboxes ? 'checkbox' : '', "aria-checked": isItemSelected, tabIndex: -1, key: row.id, selected: isItemSelected }, rest), children));
};
exports.TableBodyRow = TableBodyRow;
//# sourceMappingURL=TableBodyRow.js.map