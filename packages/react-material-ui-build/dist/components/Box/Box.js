"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Box = (props) => {
    const { children } = props;
    return (react_1.default.createElement(Box_1.default, Object.assign({}, props, { sx: Object.assign({}, props.sx) }), children));
};
exports.default = Box;
//# sourceMappingURL=Box.js.map