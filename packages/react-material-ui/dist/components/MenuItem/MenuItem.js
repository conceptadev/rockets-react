"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const MenuItem = (props) => {
    const { children } = props;
    return react_1.default.createElement(MenuItem_1.default, Object.assign({}, props), children);
};
exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map