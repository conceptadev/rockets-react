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
const useCrudRoot_1 = require("./useCrudRoot");
const http_1 = require("../../utils/http");
const CrudRoot = (props) => {
    const { customFilter, customSearch, filters, search, updateSearch, simpleFilter, updateSimpleFilter, filterCallback, externalSearch, children, navigate, } = props;
    const searchParams = new URLSearchParams(window.location.search);
    const [filterValues, setFilterValues] = (0, react_1.useState)(((searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('filterValues')) &&
        JSON.parse(searchParams.get('filterValues'))) ||
        {});
    (0, react_1.useEffect)(() => {
        filterCallback === null || filterCallback === void 0 ? void 0 : filterCallback(filterValues);
        const newFilterValues = (0, http_1.getSearchParams)(searchParams, {
            filterValues: JSON.stringify(filterValues),
        });
        const hasValues = Object.values(filterValues).filter((value) => value).length > 0;
        navigate &&
            navigate(`${window.location.pathname}?${hasValues ? newFilterValues : ''}`);
    }, [filterValues]);
    return (react_1.default.createElement(useCrudRoot_1.CrudContext.Provider, { value: {
            customFilter,
            customSearch,
            filters,
            search,
            updateSearch,
            simpleFilter,
            updateSimpleFilter,
            externalSearch,
            filterValues,
            setFilterValues,
        } }, children));
};
exports.default = CrudRoot;
//# sourceMappingURL=CrudRoot.js.map