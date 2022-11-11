"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const Avatar = (props) => {
    const { src, alt, size, onClick } = props;
    return react_1.default.createElement(Styles_1.Image, { src: src, alt: alt, size: size, onClick: onClick });
};
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map