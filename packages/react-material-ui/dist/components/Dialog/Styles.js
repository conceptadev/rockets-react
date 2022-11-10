"use strict";
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
exports.CustomDialogTitle = exports.CustomDialog = void 0;
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const Dialog_1 = __importDefault(require("@mui/material/Dialog"));
const DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const CustomDialog = (0, styles_1.styled)(Dialog_1.default)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        minWidth: 300,
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
exports.CustomDialog = CustomDialog;
const CustomDialogTitle = (props) => {
    const { children, onClose } = props, other = __rest(props, ["children", "onClose"]);
    return (react_1.default.createElement(DialogTitle_1.default, Object.assign({ sx: { m: 0, p: 2 } }, other),
        children,
        onClose ? (react_1.default.createElement(IconButton_1.default, { "aria-label": "close", onClick: onClose, sx: {
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            } },
            react_1.default.createElement(Close_1.default, null))) : null));
};
exports.CustomDialogTitle = CustomDialogTitle;
//# sourceMappingURL=Styles.js.map