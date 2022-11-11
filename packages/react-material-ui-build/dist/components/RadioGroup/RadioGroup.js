"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const Radio_1 = __importDefault(require("@mui/material/Radio"));
const RadioGroup_1 = __importDefault(require("@mui/material/RadioGroup"));
const Radio = (props) => {
    const { id, options, label, required, row, value, onChange, disabled } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label,
        required && ' *',
        react_1.default.createElement(RadioGroup_1.default, { id: id, value: `${value}`, row: row, onChange: onChange }, options.map((option, i) => {
            const radio = (react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Radio_1.default, { name: `${id}-${i}`, color: "primary", key: i }), label: `${option.label}`, value: `${option.value}`, key: i, disabled: disabled || option.disabled }));
            return radio;
        }))));
};
exports.default = Radio;
//# sourceMappingURL=RadioGroup.js.map