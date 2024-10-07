"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const SelectField_1 = require("../../components/SelectField/SelectField");
const FormFieldSkeleton_1 = require("../../components/FormFieldSkeleton");
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const AutocompleteField = (_a) => {
    var _b;
    var { value, options = [], sort, filters, resourceLabel = 'name', resourceValue = 'id', label, resource, isLoading = false, defaultValue, onChange } = _a, rest = __rest(_a, ["value", "options", "sort", "filters", "resourceLabel", "resourceValue", "label", "resource", "isLoading", "defaultValue", "onChange"]);
    const { get } = (0, react_data_provider_1.default)();
    const [_value, setValue] = (0, react_1.useState)(value !== null && value !== void 0 ? value : defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value !== null && value !== void 0 ? value : defaultValue : _value;
    const simpleFilterQuery = () => {
        if (!filters)
            return;
        const queryArr = [];
        for (const [key, value] of Object.entries(filters)) {
            queryArr.push(`${key}${value}`);
        }
        return queryArr;
    };
    const getResource = () => {
        return get({
            uri: `/${resource}`,
            queryParams: {
                sort,
                filters: simpleFilterQuery(),
            },
        });
    };
    const { execute, data, isPending } = (0, react_data_provider_1.useQuery)(getResource, false);
    const resourceOptions = [
        ...((_b = data === null || data === void 0 ? void 0 : data.map((resource) => ({
            value: resource[resourceValue],
            label: resource[resourceLabel],
        }))) !== null && _b !== void 0 ? _b : []),
    ];
    const loading = resource ? !(data === null || data === void 0 ? void 0 : data.length) || isPending : isLoading;
    const optionsWithAll = [
        SelectField_1.allOption,
        ...(!!(data === null || data === void 0 ? void 0 : data.length) && !isPending ? resourceOptions : options),
    ];
    const selectedValue = optionsWithAll.find((option) => {
        const value = typeof currentValue === 'string' ? currentValue : currentValue === null || currentValue === void 0 ? void 0 : currentValue.value;
        return option.value === value;
    });
    const handleRenderInput = (params) => (react_1.default.createElement(FormFieldSkeleton_1.FormFieldSkeleton, { isLoading: loading, hideLabel: true },
        react_1.default.createElement(material_1.TextField, Object.assign({}, params, { label: label }))));
    const handleChange = (_, newValue, reason) => {
        var _a;
        const allOptionValue = SelectField_1.allOption.value;
        if (reason === 'clear') {
            onChange(allOptionValue);
            setValue(allOptionValue);
            return;
        }
        const selectedValue = (_a = newValue === null || newValue === void 0 ? void 0 : newValue.value) !== null && _a !== void 0 ? _a : null;
        setValue(selectedValue);
        if (onChange) {
            onChange(selectedValue);
        }
    };
    (0, react_1.useEffect)(() => {
        if (resource) {
            execute();
        }
    }, [filters]);
    return (react_1.default.createElement(material_1.Autocomplete, Object.assign({ disabled: loading, isOptionEqualToValue: (option) => option.value === currentValue, onChange: handleChange, options: optionsWithAll, renderInput: handleRenderInput, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : SelectField_1.allOption, renderOption: (props, option) => {
            return (react_1.default.createElement("li", Object.assign({}, props, { key: option.value }), option.label));
        }, sx: {
            '& .MuiInputLabel-root': {
                pr: '16px',
            },
        } }, rest)));
};
exports.default = AutocompleteField;
//# sourceMappingURL=AutocompleteField.js.map