"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Select_1 = __importDefault(require("../../components/Select"));
const utils_1 = require("@rjsf/utils");
const SelectWidget = ({ schema, id, options, label, required, disabled, readonly, value, multiple, onChange, rawErrors = [], }) => {
    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : '';
    const _onChange = ({ target: { value }, }) => onChange((0, utils_1.processSelectValue)(schema, value, options));
    const selectOptions = () => {
        var _a;
        return (_a = enumOptions) === null || _a === void 0 ? void 0 : _a.map(({ value, label }) => {
            const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
            return { value, label, disabled };
        });
    };
    return (react_1.default.createElement(Select_1.default, { id: id, label: label || schema.title, value: typeof value === 'undefined' ? emptyValue : value, options: selectOptions(), onChange: _onChange, required: required, disabled: disabled || readonly, error: rawErrors.length > 0 }));
};
exports.default = SelectWidget;
//# sourceMappingURL=CustomSelectWidget.js.map