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
exports.TableRoot = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const types_1 = require("./types");
const useTableQueryState_1 = require("./hooks/useTableQueryState");
const useTableRoot_1 = require("./hooks/useTableRoot");
const http_1 = require("../../utils/http");
const TableRoot = (_a) => {
    var { children, rows = [], headers: initialHeaders = [], total, pageCount, tableQueryState: controlledTableQueryState, updateTableQueryState: controlledUpdateTableQueryState, navigate } = _a, rest = __rest(_a, ["children", "rows", "headers", "total", "pageCount", "tableQueryState", "updateTableQueryState", "navigate"]);
    const searchParams = new URLSearchParams(window.location.search);
    const { tableQueryState, setTableQueryState } = (0, useTableQueryState_1.useTableQueryState)();
    const [selected, setSelected] = (0, react_1.useState)([]);
    const [headers, setHeaders] = (0, react_1.useState)(initialHeaders);
    const isControlled = !!controlledTableQueryState;
    const handleUpdateTableQuery = isControlled
        ? controlledUpdateTableQueryState
        : setTableQueryState;
    const { order, orderBy } = isControlled
        ? controlledTableQueryState
        : tableQueryState;
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPageProperties = {
            rowsPerPage: parseInt(event.target.value, 10),
            page: 1,
        };
        handleUpdateTableQuery((prevState) => (Object.assign(Object.assign({}, prevState), newRowsPerPageProperties)));
        const newSearchParam = (0, http_1.getSearchParams)(searchParams, newRowsPerPageProperties);
        if (newSearchParam) {
            navigate && navigate(`${window.location.pathname}?${newSearchParam}`);
        }
    };
    const handleSelectAllCheckboxes = (event) => {
        if (event.target.checked) {
            setSelected(rows);
            return;
        }
        setSelected([]);
    };
    const isSelected = (id) => selected.findIndex((_row) => _row.id === id) !== -1;
    const handleSelectCheckboxItem = (event, row) => {
        const selectedIndex = selected.findIndex((_row) => _row.id === row.id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        const newPageProperty = {
            page: newPage,
        };
        handleUpdateTableQuery((prevState) => (Object.assign(Object.assign({}, prevState), newPageProperty)));
        const newSearchParam = (0, http_1.getSearchParams)(searchParams, newPageProperty);
        if (newSearchParam) {
            navigate && navigate(`${window.location.pathname}?${newSearchParam}`);
        }
    };
    const handleSort = (event, property) => {
        const isAsc = orderBy === property && order === types_1.Order.Asc;
        const newOrderProperties = {
            order: isAsc ? types_1.Order.Desc : types_1.Order.Asc,
            orderBy: property,
            page: 1,
        };
        handleUpdateTableQuery((prevState) => (Object.assign(Object.assign({}, prevState), newOrderProperties)));
        const newSearchParam = (0, http_1.getSearchParams)(searchParams, newOrderProperties);
        if (newSearchParam) {
            navigate && navigate(`${window.location.pathname}?${newSearchParam}`);
        }
    };
    return (react_1.default.createElement(useTableRoot_1.TableContext.Provider, { value: {
            rows,
            headers,
            total,
            pageCount,
            isControlled,
            tableQuery: isControlled ? controlledTableQueryState : tableQueryState,
            selected,
            setHeaders,
            isSelected,
            handleChangePage,
            handleChangeRowsPerPage,
            handleSort,
            handleSelectAllCheckboxes,
            handleSelectCheckboxItem,
        } },
        react_1.default.createElement(material_1.Box, Object.assign({ width: "100%" }, rest), children)));
};
exports.TableRoot = TableRoot;
//# sourceMappingURL=TableRoot.js.map