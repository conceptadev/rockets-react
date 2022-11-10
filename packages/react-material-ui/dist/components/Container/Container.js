"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Container = (props) => {
    const { children } = props;
    return react_1.default.createElement(Container_1.default, Object.assign({}, props), children);
};
exports.default = Container;
//# sourceMappingURL=Container.js.map