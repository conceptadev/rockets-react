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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
const react_1 = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const FilterAlt_1 = __importDefault(require("@mui/icons-material/FilterAlt"));
const SearchField_1 = __importDefault(require("../../components/SearchField"));
const AutocompleteField_1 = __importDefault(require("../../components/AutocompleteField"));
const SelectField_1 = require("../../components/SelectField");
const SelectField_2 = require("../../components/SelectField/SelectField");
const OrderableDropDown_1 = require("../OrderableDropDown");
const DatePickerField_1 = __importDefault(require("../../components/DatePickerField"));
const renderComponent = (filter) => {
    var _a, _b, _c, _d, _e;
    switch (filter.type) {
        case 'autocomplete': {
            return (react_1.default.createElement(AutocompleteField_1.default, { fullWidth: true, size: (_a = filter.size) !== null && _a !== void 0 ? _a : 'small', options: filter.options, isLoading: filter.isLoading, onChange: filter.onChange, value: filter.value, defaultValue: (_b = filter.defaultValue) !== null && _b !== void 0 ? _b : SelectField_2.allOption, label: filter.label, resource: filter.resource, resourceLabel: filter.resourceLabel, resourceValue: filter.resourceValue }));
        }
        case 'date':
            return (react_1.default.createElement(DatePickerField_1.default, { sx: {
                    width: '100%',
                }, label: filter.label, value: filter.value, onChange: filter.onChange, onDebouncedSearchChange: filter.onDebouncedSearchChange, minDate: filter.minDate, maxDate: filter.maxDate }));
        case 'select':
            return (react_1.default.createElement(SelectField_1.SelectField, { fullWidth: true, multiple: filter.multiple, size: (_c = filter.size) !== null && _c !== void 0 ? _c : 'small', label: filter.label, isLoading: filter.isLoading, options: filter.options, defaultValue: (_d = filter.defaultValue) !== null && _d !== void 0 ? _d : SelectField_2.allOption.value, onChange: filter.onChange, value: filter.value, variant: "outlined" }));
        case 'text':
            return (react_1.default.createElement(SearchField_1.default, { fullWidth: true, helperText: filter.helperText, placeholder: filter.placeholder, size: (_e = filter.size) !== null && _e !== void 0 ? _e : 'small', defaultValue: filter.defaultValue, label: filter.label, value: filter.value, onChange: (e) => { var _a; return (_a = filter.onChange) === null || _a === void 0 ? void 0 : _a.call(filter, e.target.value); }, onDebouncedSearchChange: filter.onDebouncedSearchChange
                    ? (value) => { var _a; return (_a = filter.onDebouncedSearchChange) === null || _a === void 0 ? void 0 : _a.call(filter, value); }
                    : undefined, searchIconPlacement: filter.searchIconPlacement }));
        default:
            return react_1.default.createElement(react_1.default.Fragment, null);
    }
};
const Filter = (props) => {
    const { filters, minimumFilters = 0, hasAllOption } = props, rest = __rest(props, ["filters", "minimumFilters", "hasAllOption"]);
    const resetFilters = (item) => () => {
        if (item && (item === null || item === void 0 ? void 0 : item.onDebouncedSearchChange)) {
            item.onDebouncedSearchChange(null);
        }
        if (item && (item === null || item === void 0 ? void 0 : item.onChange)) {
            item.onChange(null);
        }
    };
    const [filterOrder, setFilterOrder] = (0, react_1.useState)(filters.map((filter) => {
        var _a;
        return ({
            id: filter.id,
            label: filter.label,
            hide: (_a = filter.hide) !== null && _a !== void 0 ? _a : false,
            resetFilters: resetFilters(filter),
        });
    }));
    const handleListUpdateFromCache = (cacheList) => {
        const newItems = cacheList.map((item) => {
            const filterItemIndex = filters.findIndex((filter) => filter.id === item.id);
            const filterItem = filters[filterItemIndex];
            return Object.assign(Object.assign(Object.assign({}, item), filterItem), { resetFilters: resetFilters(filterItem) });
        });
        setFilterOrder(newItems);
    };
    return (react_1.default.createElement(Box_1.default, { display: "flex", width: "100%", alignItems: "flex-start", justifyContent: "space-between", gap: 2, sx: {
            flexDirection: { xs: 'column', md: 'row' },
        } },
        react_1.default.createElement(Grid_1.default, Object.assign({ container: true, spacing: 2 }, rest),
            filterOrder.map((filter) => {
                const filterIndex = filters.findIndex((f) => f.id === filter.id);
                if (filterIndex === -1) {
                    return null;
                }
                const currentFilter = filters[filterIndex];
                if (filter.hide) {
                    return null;
                }
                return (react_1.default.createElement(Grid_1.default, { key: `filter-${filter.id}`, item: true, xs: 12, md: currentFilter.columns || 12 }, renderComponent(currentFilter)));
            }),
            props.additionalGridItems
                ? props.additionalGridItems.map((node, index) => (react_1.default.createElement(Grid_1.default, { key: `filter-complementary-${index}`, item: true, xs: 12, md: node.columns || 12 }, typeof node.component === 'function'
                    ? node.component(filterOrder)
                    : node.component)))
                : null),
        react_1.default.createElement(Box_1.default, { display: "flex", alignItems: "center", sx: {
                width: { xs: '100%', md: 'auto' },
                justifyContent: { xs: 'end', md: 'unset' },
                gap: { xs: 4, md: 2 },
            } },
            filters.length ? (react_1.default.createElement(OrderableDropDown_1.OrderableDropDown, { hasAllOption: hasAllOption, minimumItems: minimumFilters, icon: react_1.default.createElement(FilterAlt_1.default, null), list: filterOrder, setList: setFilterOrder, storage: {
                    type: 'filter',
                    key: props.orderableListCacheKey,
                    cacheApiPath: props.cacheApiPath,
                    onListUpdateFromCache: handleListUpdateFromCache,
                } })) : null,
            typeof props.complementaryActions === 'function'
                ? props.complementaryActions(filterOrder)
                : props.complementaryActions)));
};
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map