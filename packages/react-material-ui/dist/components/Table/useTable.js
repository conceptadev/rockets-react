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
const react_1 = require("react");
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const useTableQueryState_1 = require("./hooks/useTableQueryState");
const http_1 = require("../../utils/http");
const useTable = (resource, options) => {
    const searchParams = new URLSearchParams(window.location.search);
    const { get } = (0, react_data_provider_1.default)();
    const firstRender = (0, react_1.useRef)(true);
    const { tableQueryState, setTableQueryState } = (0, useTableQueryState_1.useTableQueryState)(options);
    (0, react_1.useEffect)(() => {
        var _a;
        const newSearchParam = (0, http_1.getSearchParams)(searchParams, {
            simpleFilter: JSON.stringify(tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.simpleFilter),
        });
        (_a = options === null || options === void 0 ? void 0 : options.navigate) === null || _a === void 0 ? void 0 : _a.call(options, `${window.location.pathname}?${newSearchParam !== null && newSearchParam !== void 0 ? newSearchParam : ''}`);
    }, [JSON.stringify(tableQueryState.simpleFilter)]);
    (0, react_1.useEffect)(() => {
        var _a;
        const newSearchParam = (0, http_1.getSearchParams)(searchParams, {
            search: JSON.stringify(tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.search),
        });
        (_a = options === null || options === void 0 ? void 0 : options.navigate) === null || _a === void 0 ? void 0 : _a.call(options, `${window.location.pathname}?${newSearchParam !== null && newSearchParam !== void 0 ? newSearchParam : ''}`);
    }, [JSON.stringify(tableQueryState.search)]);
    const simpleFilterQuery = () => {
        if (!tableQueryState.simpleFilter)
            return;
        const queryArr = [];
        for (const [key, value] of Object.entries(tableQueryState.simpleFilter)) {
            queryArr.push(`${key}${value}`);
        }
        return queryArr;
    };
    (0, react_1.useEffect)(() => {
        execute();
    }, [JSON.stringify(tableQueryState)]);
    const getResource = () => {
        return get({
            uri: resource,
            queryParams: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ((tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.rowsPerPage) &&
                !(options === null || options === void 0 ? void 0 : options.noPagination) && {
                limit: tableQueryState.rowsPerPage,
            })), { page: tableQueryState.page }), ((tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.orderBy) && {
                sort: `${tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.orderBy},${tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.order.toUpperCase()}`,
            })), ((tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.simpleFilter) && { filter: simpleFilterQuery() })), ((tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.search) && {
                s: JSON.stringify(tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.search),
            })),
        });
    };
    const { data, execute, refresh, isPending, error } = (0, react_data_provider_1.useQuery)(getResource, false, options === null || options === void 0 ? void 0 : options.callbacks);
    const updateSimpleFilter = (simpleFilter, resetPage = true) => {
        setTableQueryState((prevState) => {
            var _a;
            const updatedState = Object.assign({}, prevState);
            for (const entries of Object.entries(simpleFilter)) {
                const [key, value] = entries;
                if (value == null) {
                    (_a = updatedState === null || updatedState === void 0 ? void 0 : updatedState.simpleFilter) === null || _a === void 0 ? true : delete _a[key];
                }
                else {
                    if (typeof (updatedState === null || updatedState === void 0 ? void 0 : updatedState.simpleFilter) === 'undefined') {
                        updatedState.simpleFilter = {
                            [key]: value,
                        };
                    }
                    else {
                        updatedState.simpleFilter[key] = value;
                    }
                }
            }
            const updatedSimpleFilter = (updatedState === null || updatedState === void 0 ? void 0 : updatedState.simpleFilter) &&
                Object.keys(updatedState.simpleFilter).length > 0
                ? updatedState.simpleFilter
                : undefined;
            const res = Object.assign({}, (updatedState && Object.assign(Object.assign(Object.assign({}, updatedState), (resetPage &&
                !firstRender.current && {
                page: useTableQueryState_1.TABLE_QUERY_STATE_DEFAULT_VALUE.page,
            })), { simpleFilter: updatedSimpleFilter })));
            if (firstRender.current) {
                firstRender.current = false;
            }
            return res;
        });
    };
    const updateSearch = (search, resetPage = true) => {
        setTableQueryState((prevState) => {
            var _a;
            const updatedState = Object.assign({}, prevState);
            if (search === null) {
                updatedState.search = undefined;
            }
            if (search) {
                for (const entries of Object.entries(search)) {
                    const [key, value] = entries;
                    if (value == null) {
                        (_a = updatedState === null || updatedState === void 0 ? void 0 : updatedState.search) === null || _a === void 0 ? true : delete _a[key];
                    }
                    else {
                        if (typeof (updatedState === null || updatedState === void 0 ? void 0 : updatedState.search) === 'undefined') {
                            updatedState.search = {
                                [key]: value,
                            };
                        }
                        else {
                            updatedState.search[key] = value;
                        }
                    }
                }
            }
            const updatedSearch = (updatedState === null || updatedState === void 0 ? void 0 : updatedState.search) && Object.keys(updatedState.search).length > 0
                ? updatedState.search
                : undefined;
            const res = Object.assign({}, (updatedState && Object.assign(Object.assign(Object.assign({}, updatedState), (resetPage &&
                !firstRender.current && {
                page: useTableQueryState_1.TABLE_QUERY_STATE_DEFAULT_VALUE.page,
            })), { search: updatedSearch })));
            if (firstRender.current) {
                firstRender.current = false;
            }
            return res;
        });
    };
    return {
        data: data === null || data === void 0 ? void 0 : data.data,
        isPending,
        error,
        execute,
        refresh,
        updateSimpleFilter,
        simpleFilter: tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.simpleFilter,
        updateSearch,
        search: tableQueryState === null || tableQueryState === void 0 ? void 0 : tableQueryState.search,
        total: data === null || data === void 0 ? void 0 : data.total,
        pageCount: data === null || data === void 0 ? void 0 : data.pageCount,
        tableQueryState,
        setTableQueryState,
    };
};
exports.default = useTable;
//# sourceMappingURL=useTable.js.map