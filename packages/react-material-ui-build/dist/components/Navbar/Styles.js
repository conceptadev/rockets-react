"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = exports.Navbar = void 0;
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const styles_1 = require("@mui/material/styles");
exports.Navbar = (0, styles_1.styled)(AppBar_1.default)(({ theme }) => (Object.assign({ position: 'relative' }, (theme.palette.mode === 'light' && {
    backgroundColor: theme.palette.common.white,
}))));
exports.Toolbar = (0, styles_1.styled)(Toolbar_1.default)(() => ({
    display: 'flex',
}));
//# sourceMappingURL=Styles.js.map