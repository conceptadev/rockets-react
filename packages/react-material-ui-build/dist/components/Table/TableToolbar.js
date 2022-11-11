"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const TableToolbar = ({ numSelected, children }) => {
    return (react_1.default.createElement(Toolbar_1.default, { sx: Object.assign({ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }, (numSelected > 0 && {
            bgcolor: (theme) => (0, styles_1.alpha)(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        })) }, numSelected > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, { sx: { flex: '1 1 100%' }, color: "inherit", variant: "subtitle1", component: "div" },
            numSelected,
            " selected"),
        children))));
};
exports.default = TableToolbar;
//# sourceMappingURL=TableToolbar.js.map