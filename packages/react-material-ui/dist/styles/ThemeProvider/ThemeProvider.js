"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const styles_1 = require("@mui/material/styles");
const ThemeProvider = (props) => {
    return (react_1.default.createElement(styles_1.ThemeProvider, Object.assign({}, props),
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(styles_1.StyledEngineProvider, { injectFirst: true }, props.children)));
};
exports.default = ThemeProvider;
//# sourceMappingURL=ThemeProvider.js.map