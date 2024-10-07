"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderAccount = void 0;
const react_1 = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Text_1 = __importDefault(require("../Text"));
const Avatar_1 = require("../Avatar");
const ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
const HeaderAccount = ({ avatar, avatarSize = 36, text, subText, onClick, textProps = {
    fontSize: 14,
    fontWeight: 500,
    color: 'text.primary',
}, subTextProps = {
    fontSize: 12,
    lineHeight: '10px',
    fontWeight: 500,
    color: 'text.secondary',
}, iconColor = 'text.primary', menuOptions, }) => {
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const handleOpenMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (react_1.default.createElement(Box_1.default, { display: "flex" },
        react_1.default.createElement(Button_1.default, { variant: "text", "aria-label": "open navbar menu", "aria-controls": open ? 'basic-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: onClick || handleOpenMenuClick, sx: { textTransform: 'none', textAlign: 'left' } },
            avatar && react_1.default.createElement(Avatar_1.Avatar, { src: avatar, alt: "Avatar", size: avatarSize }),
            react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column", ml: avatar ? 1 : 0 },
                react_1.default.createElement(Box_1.default, { display: "flex" },
                    react_1.default.createElement(Text_1.default, Object.assign({}, textProps), text),
                    ' ',
                    react_1.default.createElement(ExpandMore_1.default, { sx: { display: 'inline', color: iconColor } })),
                react_1.default.createElement(Text_1.default, Object.assign({}, subTextProps), subText))),
        menuOptions && (react_1.default.createElement(Menu_1.default, { id: "basic-menu", anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                'aria-labelledby': 'basic-button',
            } }, menuOptions(handleClose)))));
};
exports.HeaderAccount = HeaderAccount;
//# sourceMappingURL=HeaderAccount.js.map