"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const react_1 = __importStar(require("react"));
const Styles_1 = require("./Styles");
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const DrawerItem_1 = __importDefault(require("./DrawerItem"));
const Image_1 = __importDefault(require("../Image"));
const Text_1 = __importDefault(require("../Text"));
const Box_1 = __importDefault(require("../Box"));
const Drawer = (props) => {
    const { items, currentId, logo, toggleMobileDrawer, mobileIsOpen } = props;
    const [collapsed, setCollapsed] = (0, react_1.useState)(false);
    const toggleDrawer = () => {
        setCollapsed((prev) => !prev);
    };
    const drawer = (0, react_1.useCallback)((hideToggle) => (react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column" },
        react_1.default.createElement(Toolbar_1.default, { sx: {
                display: 'flex',
                alignItems: 'center',
                p: '20px 16px 17px !important',
            } }, logo && react_1.default.createElement(Image_1.default, { src: logo, alt: "Logo" })),
        items.map((item) => (react_1.default.createElement(DrawerItem_1.default, Object.assign({ key: item.id }, item, { collapsed: !mobileIsOpen && collapsed, active: currentId && item.id === currentId })))),
        !hideToggle && (react_1.default.createElement(Toolbar_1.default, { sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            } },
            react_1.default.createElement(IconButton_1.default, { onClick: toggleDrawer },
                react_1.default.createElement(Text_1.default, { color: "primary.contrastText" }, collapsed ? react_1.default.createElement(ChevronRight_1.default, null) : react_1.default.createElement(ChevronLeft_1.default, null))))))), [collapsed, mobileIsOpen]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Styles_1.Drawer, { variant: "temporary", open: mobileIsOpen, onClose: toggleMobileDrawer, ModalProps: {
                keepMounted: true,
            }, sx: {
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                },
            } }, drawer(true)),
        react_1.default.createElement(Styles_1.Drawer, { variant: "permanent", sx: {
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                },
            }, open: !collapsed }, drawer())));
};
exports.default = Drawer;
//# sourceMappingURL=Drawer.js.map