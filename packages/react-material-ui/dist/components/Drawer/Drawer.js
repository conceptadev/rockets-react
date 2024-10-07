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
exports.Drawer = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Styles_1 = require("./Styles");
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const DrawerItem_1 = require("./DrawerItem");
const Image_1 = require("../Image");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Drawer = (props) => {
    const { items, currentId, logo, customToggle, mobileIsOpen, onMobileClose, textProps, sx, buttonSx, horizontal, collapsible = true, collapsibleIcon, collapsibleIconColor, collapsibleIconBgColor, collapsed = false, onCollapsedChange, backgroundColor, iconColor, activeIconColor, collapsedWidth, expandedWidth, children, } = props;
    const [_collapsed, _setCollapsed] = (0, react_1.useState)(collapsed);
    (0, react_1.useEffect)(() => {
        _setCollapsed(collapsed);
    }, [collapsed]);
    const toggleDrawer = () => {
        const newCollapsedValue = !_collapsed;
        _setCollapsed(newCollapsedValue);
        onCollapsedChange === null || onCollapsedChange === void 0 ? void 0 : onCollapsedChange(newCollapsedValue);
    };
    const renderLogo = (0, react_1.useCallback)(() => {
        if (typeof logo === 'string')
            return react_1.default.createElement(Image_1.Image, { src: logo, alt: "Logo" });
        if (typeof logo === 'function')
            return logo(_collapsed);
        return logo;
    }, [logo, _collapsed]);
    const drawerContent = (hideToggle) => (react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column", sx: sx, flex: 1 },
        react_1.default.createElement(Toolbar_1.default, { sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: horizontal ? 'start' : 'center',
                p: '20px 16px 17px !important',
            } }, renderLogo()), items === null || items === void 0 ? void 0 :
        items.map((item, i) => {
            const isActive = !!currentId && currentId.startsWith(item.id);
            if (item.component)
                return (react_1.default.createElement(Box_1.default, { onClick: item.onClick, className: isActive ? 'active' : '' }, typeof item.component === 'function'
                    ? item.component(!!currentId && currentId.startsWith(item.id), _collapsed)
                    : item.component));
            return (react_1.default.createElement(DrawerItem_1.DrawerItem, Object.assign({ key: item.id || i }, item, { collapsed: !mobileIsOpen && _collapsed, active: isActive, textProps: textProps, sx: [buttonSx, ...(Array.isArray(sx) ? sx : [sx])], horizontal: item.horizontal || horizontal, iconColor: iconColor, activeIconColor: activeIconColor, temporary: hideToggle })));
        }),
        children,
        !hideToggle &&
            collapsible &&
            !!customToggle &&
            customToggle(toggleDrawer, _collapsed),
        !hideToggle && collapsible && !customToggle && (react_1.default.createElement(Toolbar_1.default, { sx: {
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            } },
            react_1.default.createElement(IconButton_1.default, { className: "Rockets-CollapsibleButton", onClick: toggleDrawer, sx: Object.assign({ color: collapsibleIconColor || 'primary.contrastText', backgroundColor: collapsibleIconBgColor || 'transparent' }, (collapsibleIconBgColor && {
                    '&:hover': {
                        backgroundColor: (0, styles_1.darken)(collapsibleIconBgColor, 0.1),
                    },
                })) },
                collapsibleIcon &&
                    typeof collapsibleIcon === 'function' &&
                    collapsibleIcon(_collapsed),
                collapsibleIcon &&
                    typeof collapsibleIcon != 'function' &&
                    collapsibleIcon,
                !collapsibleIcon &&
                    (_collapsed ? react_1.default.createElement(ChevronRight_1.default, null) : react_1.default.createElement(ChevronLeft_1.default, null)))))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Styles_1.StyledDrawer, { variant: "temporary", className: "Rockets-Drawer Rockets-Drawer-temporary", open: mobileIsOpen, ModalProps: {
                keepMounted: true,
            }, sx: {
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                },
            }, horizontal: horizontal, backgroundColor: backgroundColor, collapsedWidth: collapsedWidth, expandedWidth: expandedWidth, onClose: onMobileClose }, drawerContent(true)),
        react_1.default.createElement(Styles_1.StyledDrawer, { variant: "permanent", className: "Rockets-Drawer Rockets-Drawer-permanent", sx: {
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                },
            }, open: !_collapsed, horizontal: horizontal, backgroundColor: backgroundColor, collapsedWidth: collapsedWidth, expandedWidth: expandedWidth, "data-testid": "drawer" }, drawerContent())));
};
exports.Drawer = Drawer;
//# sourceMappingURL=Drawer.js.map