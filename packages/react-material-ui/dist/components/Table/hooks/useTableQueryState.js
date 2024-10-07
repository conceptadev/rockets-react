"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableQueryState = exports.getTableQueryState = exports.TABLE_QUERY_STATE_DEFAULT_VALUE = void 0;
const types_1 = require("../types");
const react_1 = require("react");
exports.TABLE_QUERY_STATE_DEFAULT_VALUE = {
    order: types_1.Order.Asc,
    orderBy: 'id',
    rowsPerPage: 5,
    page: 1,
};
const getTableQueryState = (tableQuery, searchParams) => ({
    order: (searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('order')) ||
        (tableQuery === null || tableQuery === void 0 ? void 0 : tableQuery.order) ||
        exports.TABLE_QUERY_STATE_DEFAULT_VALUE.order,
    orderBy: (searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('orderBy')) ||
        (tableQuery === null || tableQuery === void 0 ? void 0 : tableQuery.orderBy) ||
        exports.TABLE_QUERY_STATE_DEFAULT_VALUE.orderBy,
    rowsPerPage: Number(searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('rowsPerPage')) ||
        (tableQuery === null || tableQuery === void 0 ? void 0 : tableQuery.rowsPerPage) ||
        exports.TABLE_QUERY_STATE_DEFAULT_VALUE.rowsPerPage,
    page: Number(searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('page')) ||
        (tableQuery === null || tableQuery === void 0 ? void 0 : tableQuery.page) ||
        exports.TABLE_QUERY_STATE_DEFAULT_VALUE.page,
    simpleFilter: ((searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('simpleFilter')) &&
        JSON.parse(searchParams.get('simpleFilter'))) ||
        (tableQuery === null || tableQuery === void 0 ? void 0 : tableQuery.simpleFilter) ||
        undefined,
    search: ((searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('search')) && JSON.parse(searchParams.get('search'))) ||
        (tableQuery === null || tableQuery === void 0 ? void 0 : tableQuery.search) ||
        undefined,
});
exports.getTableQueryState = getTableQueryState;
const useTableQueryState = (tableQuery) => {
    const searchParams = new URLSearchParams(window.location.search);
    const [tableQueryState, setTableQueryState] = (0, react_1.useState)((0, exports.getTableQueryState)(tableQuery, searchParams));
    return {
        tableQueryState,
        setTableQueryState,
    };
};
exports.useTableQueryState = useTableQueryState;
//# sourceMappingURL=useTableQueryState.js.map