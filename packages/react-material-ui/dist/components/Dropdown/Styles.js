"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconContainer = void 0;
const Box_1 = __importDefault(require("@mui/material/Box"));
const styles_1 = require("@mui/material/styles");
exports.IconContainer = (0, styles_1.styled)(Box_1.default)(({ isLeftSide }) => ({
    display: 'flex',
    marginRight: isLeftSide ? '8px' : '-4px',
    marginLeft: isLeftSide ? '-4px' : '8px',
}));
//# sourceMappingURL=Styles.js.map