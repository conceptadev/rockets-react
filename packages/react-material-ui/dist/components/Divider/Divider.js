"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const Divider = (props) => {
    const { children } = props;
    if (!children)
        return react_1.default.createElement(Divider_1.default, null);
    return react_1.default.createElement(Divider_1.default, null, children);
};
exports.default = Divider;
//# sourceMappingURL=Divider.js.map