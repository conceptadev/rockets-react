"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const TablePagination_1 = __importDefault(require("@mui/material/TablePagination"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const Styles_1 = require("./Styles");
const Text_1 = __importDefault(require("../Text"));
const Box_1 = __importDefault(require("../Box"));
const table_1 = require("../../utils/table");
const TableToolbar_1 = __importDefault(require("./TableToolbar"));
const TableHeaders_1 = __importDefault(require("./TableHeaders"));
const TableOptions_1 = __importDefault(require("./TableOptions"));
const styles_1 = require("@mui/material/styles");
const TableComponent = ({ rows, headers, hasCheckboxes, hasOptions, customToolbarActionButtons, customRowOptions, variant = 'contained', toggleDirection = 'horizontal', }) => {
    const theme = (0, styles_1.useTheme)();
    const [order, setOrder] = react_1.default.useState('asc');
    const [orderBy, setOrderBy] = react_1.default.useState('id');
    const [selected, setSelected] = react_1.default.useState([]);
    const [page, setPage] = react_1.default.useState(0);
    const [rowsPerPage, setRowsPerPage] = react_1.default.useState(5);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(rows);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, row) => {
        if (!hasCheckboxes)
            return;
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
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (id) => selected.findIndex((_row) => _row.id === id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const getCellData = (cell) => {
        if (typeof cell === 'number' || typeof cell === 'string') {
            return (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 400, color: "text.primary" }, cell));
        }
        if ('component' in cell && typeof cell.sortableValue !== 'undefined') {
            return cell.component;
        }
    };
    const renderRowCells = (row) => {
        return Object.keys(row).map((key) => {
            if (key === 'id')
                return;
            return react_1.default.createElement(TableCell_1.default, { key: key }, getCellData(row[key]));
        });
    };
    const renderToolbar = (0, react_1.useMemo)(() => {
        if (typeof customToolbarActionButtons === 'function') {
            return (react_1.default.createElement(TableToolbar_1.default, { numSelected: selected.length }, customToolbarActionButtons === null || customToolbarActionButtons === void 0 ? void 0 : customToolbarActionButtons({ selectedRows: selected })));
        }
        if (Array.isArray(customToolbarActionButtons)) {
            return (react_1.default.createElement(TableToolbar_1.default, { numSelected: selected.length }, customToolbarActionButtons.map((item) => (react_1.default.createElement(Box_1.default, { sx: { cursor: 'pointer', px: 1 }, onClick: () => item.onClick({ selectedRows: selected }), key: item.key }, item.renderItem)))));
        }
        return;
    }, [customToolbarActionButtons, selected]);
    return (react_1.default.createElement(Box_1.default, { sx: { width: '100%' } },
        react_1.default.createElement(react_1.default.Fragment, null,
            renderToolbar,
            react_1.default.createElement(TableContainer_1.default, null,
                react_1.default.createElement(Styles_1.Table, { sx: { minWidth: 750 }, "aria-labelledby": "tableTitle", size: "medium", variant: variant },
                    react_1.default.createElement(TableHeaders_1.default, { numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: rows.length, headers: headers, hasCheckboxes: hasCheckboxes, hasOptions: hasOptions }),
                    react_1.default.createElement(TableBody_1.default, null,
                        rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .sort((a, b) => (0, table_1.sortTable)(a, b, order, orderBy))
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `table-checkbox-${index}`;
                            return (react_1.default.createElement(TableRow_1.default, { hover: true, onClick: (event) => handleClick(event, row), role: hasCheckboxes ? 'checkbox' : '', "aria-checked": isItemSelected, tabIndex: -1, key: row.id, selected: isItemSelected },
                                hasCheckboxes && (react_1.default.createElement(TableCell_1.default, { padding: "checkbox" },
                                    react_1.default.createElement(Checkbox_1.default, { color: "primary", checked: isItemSelected, inputProps: {
                                            'aria-labelledby': labelId,
                                        }, onClick: (event) => handleClick(event, row) }))),
                                renderRowCells(row),
                                hasOptions && (react_1.default.createElement(TableCell_1.default, null,
                                    react_1.default.createElement(TableOptions_1.default, { row: row, customRowOptions: customRowOptions, toggleDirection: toggleDirection })))));
                        }),
                        emptyRows > 0 && (react_1.default.createElement(TableRow_1.default, { style: {
                                height: 53 * emptyRows,
                            } },
                            react_1.default.createElement(TableCell_1.default, { colSpan: 6 })))))),
            react_1.default.createElement(TablePagination_1.default, { rowsPerPageOptions: [5, 10, 25], component: "div", count: rows.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, sx: Object.assign({}, (variant === 'outlined' && {
                    backgroundColor: theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[800],
                    border: `solid 1px #e5e7eb`,
                    borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderLeftStyle: 'solid',
                    borderRightStyle: 'solid',
                })) }))));
};
exports.default = TableComponent;
//# sourceMappingURL=Table.js.map