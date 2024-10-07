"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBodyOption = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const TableOptions_1 = __importDefault(require("../TableOptions"));
const TableBodyOption = ({ row, customRowOptions, toggleDirection, }) => {
    return (react_1.default.createElement(material_1.TableCell, null,
        react_1.default.createElement(TableOptions_1.default, { row: row, customRowOptions: customRowOptions, toggleDirection: toggleDirection })));
};
exports.TableBodyOption = TableBodyOption;
//# sourceMappingURL=TableBodyOption.js.map