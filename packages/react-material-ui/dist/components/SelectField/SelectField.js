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
exports.SelectField = exports.allOption = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const FormFieldSkeleton_1 = require("../../components/FormFieldSkeleton");
exports.allOption = {
    value: 'all',
    label: 'All',
};
const getStatusValue = (value) => {
    return value === exports.allOption.value ? null : value;
};
const SelectField = (_a) => {
    var { options = [], defaultValue, hasAllOption = true, isLoading = false, label, onChange, fullWidth, size, variant = 'outlined' } = _a, rest = __rest(_a, ["options", "defaultValue", "hasAllOption", "isLoading", "label", "onChange", "fullWidth", "size", "variant"]);
    const handleChange = (event) => {
        const value = event.target.value;
        onChange(getStatusValue(value));
    };
    const finalOptions = [...(hasAllOption ? [exports.allOption] : []), ...options];
    return (react_1.default.createElement(material_1.Box, null,
        react_1.default.createElement(FormFieldSkeleton_1.FormFieldSkeleton, { isLoading: isLoading, hideLabel: true },
            react_1.default.createElement(material_1.FormControl, { fullWidth: fullWidth, size: size },
                react_1.default.createElement(material_1.InputLabel, { id: "select-label" }, label),
                react_1.default.createElement(material_1.Select, Object.assign({ labelId: "select-label", defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : (hasAllOption && exports.allOption.value), onChange: handleChange, label: label, fullWidth: fullWidth, size: size, variant: variant }, rest), finalOptions === null || finalOptions === void 0 ? void 0 : finalOptions.map((role) => (react_1.default.createElement(material_1.MenuItem, { key: role.value, value: role.value }, role.label))))))));
};
exports.SelectField = SelectField;
//# sourceMappingURL=SelectField.js.map