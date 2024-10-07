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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Filter_1 = require("../../../components/Filter");
const useCrudRoot_1 = require("../../../modules/crud/useCrudRoot");
const FilterSubmodule = (props) => {
    const { filters, updateSearch, simpleFilter, updateSimpleFilter, externalSearch: _externalSearch, filterValues, setFilterValues, customFilter, customSearch, } = (0, useCrudRoot_1.useCrudRoot)();
    const customSearchData = (0, react_1.useMemo)(() => customSearch === null || customSearch === void 0 ? void 0 : customSearch(filterValues), [filterValues]);
    const externalSearch = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, _externalSearch), customSearchData)), [customSearchData, _externalSearch]);
    const hasExternalSearch = externalSearch &&
        Object.values(externalSearch).filter((value) => value).length > 0;
    const reduceFilters = (_filterValues, format) => filters.reduce((acc, filter) => {
        const value = _filterValues[filter.id];
        if (!filter.operator)
            return acc;
        if (typeof value === 'undefined')
            return acc;
        const data = format === 'simpleFilter'
            ? `||$${filter.operator}||${value}`
            : { [`$${filter.operator}`]: value };
        return Object.assign(Object.assign({}, acc), { [filter.id]: value === null || value === 'all' || value === '' ? null : data });
    }, {});
    (0, react_1.useEffect)(() => {
        if (!hasExternalSearch) {
            updateSearch(null);
            const filterObj = Object.assign(Object.assign({}, reduceFilters(filterValues, 'simpleFilter')), customFilter === null || customFilter === void 0 ? void 0 : customFilter(filterValues));
            updateSimpleFilter(filterObj, true);
        }
        if (hasExternalSearch) {
            const filterObj = Object.assign(Object.assign({}, reduceFilters(filterValues, 'search')), customFilter === null || customFilter === void 0 ? void 0 : customFilter(filterValues));
            const combinedFilter = Object.assign(Object.assign({}, filterObj), externalSearch);
            updateSearch(combinedFilter, true);
        }
    }, [externalSearch]);
    const onFilterChange = (id, value, updateFilter) => {
        setFilterValues((prv) => {
            const newFilterValues = Object.assign(Object.assign({}, prv), { [id]: value });
            if (updateFilter) {
                const filterObj = Object.assign(Object.assign({}, reduceFilters(newFilterValues, 'simpleFilter')), customFilter === null || customFilter === void 0 ? void 0 : customFilter(newFilterValues));
                updateSimpleFilter(filterObj, true);
            }
            return newFilterValues;
        });
    };
    const filterObjs = filters.map((filter) => {
        var _a, _b;
        const { id, label, columns, type, options, operator, isLoading, size, resource, resourceValue, resourceLabel, searchIconPlacement, } = filter;
        const initialValue = (_a = String(simpleFilter === null || simpleFilter === void 0 ? void 0 : simpleFilter[id])) === null || _a === void 0 ? void 0 : _a.split('||')[2];
        const value = (_b = filterValues[id]) !== null && _b !== void 0 ? _b : initialValue;
        const commonFields = {
            id,
            label,
            columns,
            isLoading,
            size,
            operator,
            searchIconPlacement,
        };
        switch (type) {
            case 'text':
                return Object.assign(Object.assign({}, commonFields), { type, value: value, onChange: (val) => onFilterChange(id, val, false), onDebouncedSearchChange: (val) => onFilterChange(id, val, true) });
            case 'autocomplete':
                return Object.assign(Object.assign({}, commonFields), { type,
                    options, value: value, resource,
                    resourceLabel,
                    resourceValue, onChange: (val) => onFilterChange(id, val, true) });
            case 'select':
                return Object.assign(Object.assign({}, commonFields), { type,
                    options, value: value, onChange: (val) => onFilterChange(id, val, true) });
            case 'date':
                return Object.assign(Object.assign({}, commonFields), { type,
                    options, value: value, onChange: (val) => onFilterChange(id, val, false), onDebouncedSearchChange: (val) => onFilterChange(id, val, true) });
            default:
                break;
        }
    });
    if (filters.length === 0)
        return null;
    return react_1.default.createElement(Filter_1.Filter, Object.assign({}, props, { filters: filterObjs }));
};
exports.default = FilterSubmodule;
//# sourceMappingURL=index.js.map