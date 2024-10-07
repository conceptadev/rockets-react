"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const FormLabel_1 = require("../FormLabel");
const RadioGroup = (props) => {
    const { id, name, containerProps, labelProps, options, label, required, row, value, onChange, disabled, } = props;
    return (react_1.default.createElement(material_1.Box, Object.assign({}, containerProps),
        react_1.default.createElement(material_1.FormControl, null,
            label && (react_1.default.createElement(FormLabel_1.FormLabel, { name: name, label: label, required: required, labelProps: labelProps })),
            react_1.default.createElement(material_1.RadioGroup, { id: id, value: `${value}`, row: row, onChange: onChange }, options.map((option, i) => (react_1.default.createElement(material_1.FormControlLabel, { control: react_1.default.createElement(material_1.Radio, { name: `${id}-${i}`, color: "primary", key: i }), label: `${option.label}`, value: `${option.value}`, key: i, disabled: disabled || option.disabled })))))));
};
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=RadioGroup.js.map