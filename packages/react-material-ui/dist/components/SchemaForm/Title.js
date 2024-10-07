"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Text_1 = __importDefault(require("../Text"));
const react_1 = __importDefault(require("react"));
const Title = ({ children }) => (react_1.default.createElement(Text_1.default, { variant: "h4", fontFamily: "Inter", fontSize: 24, fontWeight: 800, mt: 4, gutterBottom: true }, children));
exports.default = Title;
//# sourceMappingURL=Title.js.map