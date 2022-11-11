"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const Text_1 = __importDefault(require("../Text"));
const DrawerItem = (props) => {
    const { icon, text, active, collapsed, onClick } = props;
    const handleClick = () => {
        return onClick === null || onClick === void 0 ? void 0 : onClick();
    };
    return (react_1.default.createElement(Styles_1.DrawerButton, { onClick: handleClick, active: active, collapsed: collapsed },
        icon,
        react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, color: "common.white" }, text)));
};
exports.default = DrawerItem;
//# sourceMappingURL=DrawerItem.js.map