"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Text = (typographyProps) => {
    const { children, fontWeight = '300' } = typographyProps;
    return (react_1.default.createElement(Typography_1.default, Object.assign({ fontWeight: fontWeight }, typographyProps), children));
};
exports.default = Text;
//# sourceMappingURL=Text.js.map