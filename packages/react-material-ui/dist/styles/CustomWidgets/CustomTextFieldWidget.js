"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("@rjsf/utils");
const TextField_1 = require("../../components/TextField");
const TYPES_THAT_SHRINK_LABEL = ['date', 'datetime-local', 'file', 'time'];
function CustomTextFieldWidget(props) {
    const { id, name, placeholder, required, readonly, disabled, type, label, hideLabel, value, onChange, onChangeOverride, onBlur, onFocus, autofocus, options, schema, uiSchema, rawErrors = [], formContext, registry, InputLabelProps } = props, textFieldProps = __rest(props, ["id", "name", "placeholder", "required", "readonly", "disabled", "type", "label", "hideLabel", "value", "onChange", "onChangeOverride", "onBlur", "onFocus", "autofocus", "options", "schema", "uiSchema", "rawErrors", "formContext", "registry", "InputLabelProps"]);
    const inputProps = (0, utils_1.getInputProps)(schema, type, options);
    const { step, min, max } = inputProps, rest = __rest(inputProps, ["step", "min", "max"]);
    const otherProps = Object.assign({ inputProps: Object.assign({ step,
            min,
            max }, (schema.examples ? { list: (0, utils_1.examplesId)(id) } : undefined)) }, rest);
    const formatData = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:formatter'];
    const _onChange = ({ target: { value } }) => onChange(value === ''
        ? options.emptyValue
        : formatData
            ? formatData(value)
            : value);
    const _onBlur = ({ target: { value } }) => onBlur(id, value);
    const _onFocus = ({ target: { value } }) => onFocus(id, value);
    const DisplayInputLabelProps = TYPES_THAT_SHRINK_LABEL.includes(type)
        ? Object.assign(Object.assign({}, InputLabelProps), { shrink: true }) : InputLabelProps;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TextField_1.TextField, Object.assign({ id: id, name: id, placeholder: placeholder, label: (0, utils_1.labelValue)(label || undefined, hideLabel, false), autoFocus: autofocus, required: required, disabled: disabled || readonly }, otherProps, { value: value || value === 0 ? value : '', error: rawErrors.length > 0, onChange: onChangeOverride || _onChange, onBlur: _onBlur, onFocus: _onFocus, InputLabelProps: DisplayInputLabelProps }, textFieldProps, { "aria-describedby": (0, utils_1.ariaDescribedByIds)(id, !!schema.examples) })),
        Array.isArray(schema.examples) && (react_1.default.createElement("datalist", { id: (0, utils_1.examplesId)(id) }, schema.examples
            .concat(schema.default && !schema.examples.includes(schema.default)
            ? [schema.default]
            : [])
            .map((example) => {
            return react_1.default.createElement("option", { key: example, value: example });
        })))));
}
exports.default = CustomTextFieldWidget;
//# sourceMappingURL=CustomTextFieldWidget.js.map