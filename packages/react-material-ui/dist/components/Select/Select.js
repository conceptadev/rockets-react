"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const FormLabel_1 = require("../FormLabel");
const Select = (props) => {
    const { id, label, size, value, containerProps, labelProps, options, onChange, required, disabled, error, helperText, name, } = props;
    const labelId = `label-${name}`;
    return (react_1.default.createElement(material_1.Box, Object.assign({}, containerProps),
        react_1.default.createElement(material_1.FormControl, { fullWidth: true },
            label && typeof label === 'string' ? (react_1.default.createElement(FormLabel_1.FormLabel, { id: labelId, name: name, label: label, required: required, labelProps: labelProps })) : (label),
            react_1.default.createElement(material_1.TextField, { id: id, select: true, name: name, value: value, disabled: disabled, size: size || 'small', error: error, helperText: helperText, onChange: onChange, sx: {
                    marginTop: 0.5,
                    width: '100%',
                }, hiddenLabel: true, label: '', "aria-labelledby": labelId, "data-testid": "select" }, options.map(({ value, label }, i) => {
                return (react_1.default.createElement(material_1.MenuItem, { key: i, value: value, disabled: disabled }, label));
            })))));
};
exports.Select = Select;
//# sourceMappingURL=Select.js.map