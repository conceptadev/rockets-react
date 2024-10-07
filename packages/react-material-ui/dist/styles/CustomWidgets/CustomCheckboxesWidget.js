"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Checkbox_1 = require("../../components/Checkbox");
const CustomCheckboxesWidget = (props) => {
    const { label, uiSchema, id, disabled, options, value, autofocus, readonly, required, onChange, } = props;
    const { enumOptions, enumDisabled } = options;
    const selectValue = (value, selected, all) => {
        const at = all.indexOf(value);
        const updated = selected.slice(0, at).concat(value, selected.slice(at));
        return updated
            .sort((a, b) => all.indexOf(a) > all.indexOf(b))
            .filter((item) => item !== '');
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
    return (react_1.default.createElement(material_1.FormControl, null,
        react_1.default.createElement(material_1.Box, { id: id, my: 1 },
            react_1.default.createElement(material_1.Typography, { variant: "h5" }, label),
            react_1.default.createElement(material_1.Divider, null)),
        react_1.default.createElement(material_1.Grid, { display: "flex", flexDirection: (uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:inline']) ? 'row' : 'column', flexWrap: "wrap", py: 2 }, enumOptions.map((option, index) => {
            const checked = value.indexOf(option.value) !== -1;
            const itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) != -1;
            return (react_1.default.createElement(Checkbox_1.Checkbox, { id: `${id}_${index}`, checked: checked, disabled: disabled || itemDisabled || readonly, autoFocus: autofocus && index === 0, onChange: _onChange(option), key: index, label: option.label, required: required }));
        }))));
};
exports.default = CustomCheckboxesWidget;
//# sourceMappingURL=CustomCheckboxesWidget.js.map