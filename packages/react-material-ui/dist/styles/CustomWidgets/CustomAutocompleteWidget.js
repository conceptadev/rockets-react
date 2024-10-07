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
const utils_1 = require("@rjsf/utils");
const material_1 = require("@mui/material");
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const FormFieldSkeleton_1 = require("../../components/FormFieldSkeleton");
const SelectField_1 = require("../../components/SelectField/SelectField");
const TextField_1 = require("../../components/TextField");
const availableOptionsValueMap = (value, optEmptyVal, options) => {
    if (!value)
        return optEmptyVal;
    if (Array.isArray(value)) {
        if (value.find((option) => option.value === SelectField_1.allOption.value)) {
            return options.map((option) => option.value);
        }
        return (value === null || value === void 0 ? void 0 : value.length) < 1
            ? []
            : [...new Set(value.map((item) => item.value))];
    }
    return value === null || value === void 0 ? void 0 : value.value;
};
function CustomAutocompleteWidget(_a) {
    var _b;
    var { schema, id, name, options, label, hideLabel, required, disabled, placeholder, readonly, value, multiple, autofocus, onChange, onBlur, onFocus, rawErrors = [], size, registry, uiSchema, hideError, formContext } = _a, textFieldProps = __rest(_a, ["schema", "id", "name", "options", "label", "hideLabel", "required", "disabled", "placeholder", "readonly", "value", "multiple", "autofocus", "onChange", "onBlur", "onFocus", "rawErrors", "size", "registry", "uiSchema", "hideError", "formContext"]);
    const { get } = (0, react_data_provider_1.default)();
    const { enumOptions } = options;
    const resource = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:resource'];
    const resourceLabel = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:resourceLabel'];
    const resourceValue = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:resourceValue'];
    const queryParams = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:queryParams'];
    const renderOption = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:renderOption'];
    const selectAll = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:selectAll'];
    const additionalOptions = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:additionalOptions'];
    const uiMultiple = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:multiple'];
    const limitTags = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['ui:limitTags'];
    const getResource = () => {
        return get({
            uri: `/${resource}`,
            queryParams,
        });
    };
    const { execute, data, isPending } = (0, react_data_provider_1.useQuery)(getResource, false);
    const resourceOptions = [
        ...(Array.isArray(additionalOptions) ? additionalOptions : []),
        ...((_b = data === null || data === void 0 ? void 0 : data.map((resource) => ({
            value: resource[resourceValue !== null && resourceValue !== void 0 ? resourceValue : 'id'],
            label: resource[resourceLabel !== null && resourceLabel !== void 0 ? resourceLabel : 'name'],
        }))) !== null && _b !== void 0 ? _b : []),
    ];
    const availableOptions = resource ? resourceOptions : enumOptions;
    multiple = uiMultiple || (!!multiple && typeof multiple !== 'undefined');
    const emptyValue = multiple ? [] : undefined;
    const isEmpty = typeof value === 'undefined' ||
        (multiple && value.length < 1) ||
        (!multiple && value === emptyValue);
    const controlledValue = (0, react_1.useMemo)(() => {
        if (multiple) {
            return value === null || value === void 0 ? void 0 : value.map((optionValue) => availableOptions === null || availableOptions === void 0 ? void 0 : availableOptions.find((option) => option.value === optionValue));
        }
        return availableOptions === null || availableOptions === void 0 ? void 0 : availableOptions.find((option) => option.value === value);
    }, [availableOptions, value, multiple]);
    const _onChange = (_, newValue) => onChange(availableOptionsValueMap(newValue, emptyValue, availableOptions));
    (0, react_1.useEffect)(() => {
        if (resource) {
            execute();
        }
    }, [JSON.stringify(queryParams)]);
    return (react_1.default.createElement(material_1.Autocomplete, { multiple: multiple, limitTags: limitTags, filterOptions: (options, params) => {
            const filter = (0, material_1.createFilterOptions)();
            const filtered = filter(options, params);
            if (selectAll) {
                filtered.unshift({ label: selectAll, value: SelectField_1.allOption.value });
            }
            return filtered;
        }, renderOption: (props, option, state, ownerState) => {
            if (!renderOption) {
                return (react_1.default.createElement("li", Object.assign({}, props, { key: option.key }), option.label));
            }
            return renderOption(props, option, state, ownerState);
        }, options: availableOptions !== null && availableOptions !== void 0 ? availableOptions : [], isOptionEqualToValue: (option) => option.value === controlledValue, getOptionLabel: (option) => option === null || option === void 0 ? void 0 : option.label, size: size !== null && size !== void 0 ? size : 'small', value: controlledValue, onChange: _onChange, renderInput: (params) => (react_1.default.createElement(FormFieldSkeleton_1.FormFieldSkeleton, { isLoading: isPending },
            react_1.default.createElement(TextField_1.TextField, Object.assign({}, params, { id: id, name: id, label: (0, utils_1.labelValue)(label || undefined, hideLabel, false), required: required, disabled: disabled || readonly, autoFocus: autofocus, placeholder: placeholder, error: rawErrors.length > 0 }, textFieldProps, { InputLabelProps: Object.assign(Object.assign({}, textFieldProps.InputLabelProps), { shrink: !isEmpty }), SelectProps: Object.assign(Object.assign({}, textFieldProps.SelectProps), { multiple }), "aria-describedby": (0, utils_1.ariaDescribedByIds)(id) })))) }));
}
exports.default = CustomAutocompleteWidget;
//# sourceMappingURL=CustomAutocompleteWidget.js.map