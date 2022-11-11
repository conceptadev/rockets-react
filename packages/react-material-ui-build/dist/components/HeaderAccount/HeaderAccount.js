"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Text_1 = __importDefault(require("../Text"));
const Avatar_1 = __importDefault(require("../Avatar"));
const HeaderAccount = ({ avatar, avatarSize = 36, text, subText, onClick, }) => (react_1.default.createElement(Box_1.default, { onClick: onClick, display: "flex" },
    avatar && react_1.default.createElement(Avatar_1.default, { src: avatar, alt: "Avatar", size: avatarSize }),
    react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column" },
        react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, color: "text.primary" }, text),
        react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, color: "grey.600" }, subText))));
exports.default = HeaderAccount;
//# sourceMappingURL=HeaderAccount.js.map