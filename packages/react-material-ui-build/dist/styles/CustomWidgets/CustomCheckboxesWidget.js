"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("../../components/Checkbox"));
const CustomCheckboxesWidget = (props) => {
    const { label, id, disabled, options, value, autofocus, readonly, required, onChange, } = props;
    const { enumOptions, enumDisabled } = options;
    const selectValue = (value, selected, all) => {
        const at = all.indexOf(value);
        const updated = selected.slice(0, at).concat(value, selected.slice(at));
        return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
    };
    const deselectValue = (value, selected) => {
        return selected.filter((v) => v !== value);
    };
    const _onChange = (option) => ({ target: { checked } }) => {
        const all = enumOptions.map(({ value }) => value);
        if (checked) {
            onChange(selectValue(option.value, value, all));
        }
        else {
            onChange(deselectValue(option.value, value));
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label,
        required && ' *',
        enumOptions.map((option, index) => {
            const checked = value.indexOf(option.value) !== -1;
            const itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) != -1;
            return (react_1.default.createElement(Checkbox_1.default, { id: `${id}_${index}`, checked: checked, disabled: disabled || itemDisabled || readonly, autoFocus: autofocus && index === 0, onChange: _onChange(option), key: index, label: option.label, required: required }));
        })));
};
exports.default = CustomCheckboxesWidget;
//# sourceMappingURL=CustomCheckboxesWidget.js.map