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
const react_1 = __importStar(require("react"));
const react_auth_provider_1 = require("@concepta/react-auth-provider");
const Container_1 = __importDefault(require("@mui/material/Container"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const react_router_dom_1 = require("react-router-dom");
const react_material_ui_1 = require("@concepta/react-material-ui");
function AppBarContainer({ children, menuItems, drawerProps, navbarProps, }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const { user, doLogout } = (0, react_auth_provider_1.useAuth)();
    const onLogoutClick = (handleCloseMenu) => {
        handleCloseMenu();
        doLogout();
        (0, react_1.startTransition)(() => navigate('/sign-in'));
    };
    const drawerItems = (drawerProps === null || drawerProps === void 0 ? void 0 : drawerProps.items)
        ? [...menuItems, ...drawerProps.items]
        : menuItems;
    return (react_1.default.createElement(react_material_ui_1.AppBar.Root, { key: location.pathname },
        react_1.default.createElement(react_material_ui_1.AppBar.Drawer, Object.assign({ currentId: location.pathname, logo: "/logo.svg", collapsible: true, expandedWidth: 120 }, drawerProps, { items: drawerItems })),
        react_1.default.createElement(react_material_ui_1.AppBar.Main, null,
            react_1.default.createElement(react_material_ui_1.AppBar.Nav, Object.assign({ text: (user === null || user === void 0 ? void 0 : user.username) || '', headerMenuOptions: (handleClose) => (react_1.default.createElement(MenuItem_1.default, { onClick: () => onLogoutClick(handleClose) }, "Sign Out")) }, navbarProps)),
            react_1.default.createElement(Container_1.default, null, children))));
}
exports.default = AppBarContainer;
//# sourceMappingURL=AppBarContainer.js.map