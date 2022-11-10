"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("../Box"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const SelectWidget = (props) => {
    const { id, label, value, options, onChange, required, disabled, error } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label && (react_1.default.createElement(Box_1.default, null,
            label,
            required && ' *')),
        react_1.default.createElement(TextField_1.default, { id: id, select: true, value: value, disabled: disabled, error: error, onChange: onChange, sx: { width: '100%' } }, options.map(({ value, label }, i) => {
            return (react_1.default.createElement(MenuItem_1.default, { key: i, value: value, disabled: disabled }, label));
        }))));
};
exports.default = SelectWidget;
//# sourceMappingURL=Select.js.map