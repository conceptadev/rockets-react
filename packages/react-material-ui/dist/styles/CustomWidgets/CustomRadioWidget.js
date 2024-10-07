"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RadioGroup_1 = require("../../components/RadioGroup");
const CustomRadioWidget = (props) => {
    const { id, schema, options, value, required, disabled, label, onChange } = props;
    const { enumOptions } = options;
    const _onChange = (_, value) => {
        onChange(schema.type == 'boolean' ? value !== 'false' : value);
    };
    const row = options ? options.inline : false;
    return (react_1.default.createElement(RadioGroup_1.RadioGroup, { id: id, options: enumOptions, onChange: _onChange, row: row, value: value, disabled: disabled, required: required, label: label }));
};
exports.default = CustomRadioWidget;
//# sourceMappingURL=CustomRadioWidget.js.map