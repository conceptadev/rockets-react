"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Button = ({ children }) => (react_1.default.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3 } }, children));
exports.default = Button;
//# sourceMappingURL=Button.js.map