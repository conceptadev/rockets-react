"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Select_1 = require("../../components/Select");
const CustomSelectWidget = ({ id, options, label, required, disabled, readonly, value, multiple, onChange, rawErrors = [], }) => {
    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : '';
    const _onChange = ({ target: { value }, }) => onChange(value);
    const selectOptions = () => enumOptions === null || enumOptions === void 0 ? void 0 : enumOptions.map(({ value, label }) => {
        const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
        return { value, label, disabled };
    });
    return (react_1.default.createElement(Select_1.Select, { id: id, label: label, value: typeof value === 'undefined' ? emptyValue : value, options: selectOptions(), onChange: _onChange, required: required, disabled: disabled || readonly, error: rawErrors.length > 0 }));
};
exports.default = CustomSelectWidget;
//# sourceMappingURL=CustomSelectWidget.js.map