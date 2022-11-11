"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ThemeProvider_1 = __importDefault(require("@mui/material/styles/ThemeProvider"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const ThemeProvider = (props) => {
    return (react_1.default.createElement(ThemeProvider_1.default, Object.assign({}, props),
        react_1.default.createElement(CssBaseline_1.default, null),
        props.children));
};
exports.default = ThemeProvider;
//# sourceMappingURL=ThemeProvider.js.map