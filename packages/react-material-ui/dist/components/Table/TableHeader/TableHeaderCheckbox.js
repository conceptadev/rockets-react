"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHeaderCheckbox = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useTableRoot_1 = require("../hooks/useTableRoot");
const TableHeaderCheckbox = (props) => {
    const { rows, selected, handleSelectAllCheckboxes } = (0, useTableRoot_1.useTableRoot)();
    const numSelected = selected.length;
    const rowCount = rows.length;
    return (react_1.default.createElement(material_1.TableCell, Object.assign({ padding: "checkbox" }, props),
        react_1.default.createElement(material_1.Checkbox, { color: "primary", indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: handleSelectAllCheckboxes, inputProps: {
                'aria-label': 'select all',
            } })));
};
exports.TableHeaderCheckbox = TableHeaderCheckbox;
//# sourceMappingURL=TableHeaderCheckbox.js.map