"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const Link = (props) => {
    const { children, color = 'primary.dark' } = props;
    return (react_1.default.createElement(Link_1.default, Object.assign({ sx: { textDecoration: 'none' }, color: color }, props), children));
};
exports.default = Link;
//# sourceMappingURL=Link.js.map