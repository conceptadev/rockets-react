"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerItem = exports.DEFAULT_DRAWER_TEXT_PROPS = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Styles_1 = require("./Styles");
const Text_1 = __importDefault(require("../Text"));
exports.DEFAULT_DRAWER_TEXT_PROPS = {
    fontSize: 12,
    fontWeight: 400,
    color: 'common.white',
};
const DrawerItem = (props) => {
    const { id, icon, text, active, collapsed, onClick, textProps = exports.DEFAULT_DRAWER_TEXT_PROPS, sx, horizontal, iconColor, activeIconColor, temporary, } = props;
    const handleClick = () => {
        return onClick === null || onClick === void 0 ? void 0 : onClick();
    };
    return (react_1.default.createElement(Styles_1.DrawerButton, { className: `Rockets-DrawerButton ${active ? 'active' : ''}`, "data-testid": `drawer-item-${id}-${temporary ? 'temporary' : 'permanent'}`, active: active, collapsed: collapsed, onClick: handleClick, sx: sx, horizontal: horizontal, iconColor: iconColor, activeIconColor: activeIconColor },
        typeof icon === 'function' ? icon(!!active) : icon,
        text && horizontal && (react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center" },
            react_1.default.createElement(Text_1.default, Object.assign({ position: "absolute" }, textProps), text))),
        text && !horizontal && (react_1.default.createElement(Text_1.default, { sx: Object.assign({ position: 'absolute', bottom: 0 }, textProps) }, text))));
};
exports.DrawerItem = DrawerItem;
//# sourceMappingURL=DrawerItem.js.map