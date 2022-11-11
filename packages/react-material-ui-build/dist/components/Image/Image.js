"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Image = (props) => {
    const { src, alt } = props;
    return react_1.default.createElement("img", { src: src, alt: alt });
};
exports.default = Image;
//# sourceMappingURL=Image.js.map