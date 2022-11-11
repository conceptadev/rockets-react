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
const Box_1 = __importDefault(require("@mui/material/Box"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const Drawer_1 = __importDefault(require("../Drawer"));
const Navbar_1 = __importDefault(require("../Navbar"));
const ContainerWithDrawer = ({ drawerItems, currentId, logo, children, showNotifications, notificationsNumber, notificationsOnClick, avatar, text, subText, }) => {
    const [mobileIsOpen, setMobileIsOpen] = (0, react_1.useState)(false);
    const toggleMobileDrawer = () => {
        setMobileIsOpen((prv) => !prv);
    };
    return (react_1.default.createElement(Box_1.default, { sx: { display: 'flex' }, id: "ContainerWithDrawer" },
        react_1.default.createElement(Drawer_1.default, { items: drawerItems, currentId: currentId, toggleMobileDrawer: toggleMobileDrawer, mobileIsOpen: mobileIsOpen, logo: logo }),
        react_1.default.createElement(Box_1.default, { component: "main", sx: {
                backgroundColor: (theme) => theme.palette.background.default,
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            } },
            react_1.default.createElement(Navbar_1.default, { drawerToggle: toggleMobileDrawer, showNotifications: showNotifications, notificationsNumber: notificationsNumber, notificationsOnClick: notificationsOnClick, avatar: avatar, text: text, subText: subText }),
            react_1.default.createElement(Container_1.default, { maxWidth: "lg", sx: { mt: 4, mb: 4 } }, children),
            react_1.default.createElement(Toolbar_1.default, null))));
};
exports.default = ContainerWithDrawer;
//# sourceMappingURL=ContainerWithDrawer.js.map