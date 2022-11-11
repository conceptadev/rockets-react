"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Text = (props) => {
    const { children, fontFamily = 'Inter', fontWeight = '300' } = props;
    return (react_1.default.createElement(Typography_1.default, Object.assign({}, props, { fontFamily: fontFamily, fontWeight: fontWeight }), children));
};
exports.default = Text;
//# sourceMappingURL=Text.js.map