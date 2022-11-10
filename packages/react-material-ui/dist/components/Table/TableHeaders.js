"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableSortLabel_1 = __importDefault(require("@mui/material/TableSortLabel"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const utils_1 = require("@mui/utils");
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const TableHeaders = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headers, hasCheckboxes, hasOptions, } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (react_1.default.createElement(TableHead_1.default, null,
        react_1.default.createElement(TableRow_1.default, null,
            hasCheckboxes && (react_1.default.createElement(TableCell_1.default, { padding: "checkbox" },
                react_1.default.createElement(Checkbox_1.default, { color: "primary", indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: {
                        'aria-label': 'select all',
                    } }))),
            headers.map((headCell) => (react_1.default.createElement(TableCell_1.default, { key: headCell.id, align: (headCell === null || headCell === void 0 ? void 0 : headCell.textAlign) || headCell.numeric ? 'right' : 'left', padding: headCell.disablePadding ? 'none' : 'normal', sortDirection: orderBy === headCell.id ? order : false },
                react_1.default.createElement(TableSortLabel_1.default, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : 'asc', onClick: createSortHandler(headCell.id) },
                    headCell.label,
                    orderBy === headCell.id ? (react_1.default.createElement(Box_1.default, { component: "span", sx: utils_1.visuallyHidden }, order === 'desc' ? 'sorted descending' : 'sorted ascending')) : null)))),
            hasOptions && react_1.default.createElement(TableCell_1.default, { key: "options", align: "left", padding: "none" }))));
};
exports.default = TableHeaders;
//# sourceMappingURL=TableHeaders.js.map