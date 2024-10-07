"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = __importDefault(require("react"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Notifications_1 = require("../Notifications");
const Text_1 = __importDefault(require("../Text"));
const HeaderAccount_1 = require("../HeaderAccount");
const Navbar = ({ drawerToggle, showNotifications, notificationsNumber, notificationsOnClick, avatar, text, subText, headerMenuOptions, sx, }) => {
    return (react_1.default.createElement(Box_1.default, { "data-testid": "navbarContainer", sx: [
            (theme) => (Object.assign(Object.assign({ position: 'relative', padding: '12px 24px' }, (theme.palette.mode === 'light' && {
                backgroundColor: theme.palette.common.white,
            })), { '&:after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    bottom: '0',
                    height: '1px',
                    background: '#e5e7eb',
                    left: '40px',
                    right: '40px',
                } })),
            ...(Array.isArray(sx) ? sx : [sx]),
        ] },
        react_1.default.createElement(Box_1.default, { display: "flex" },
            drawerToggle && (react_1.default.createElement(Text_1.default, { color: "text.primary" },
                react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: drawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
                    react_1.default.createElement(Menu_1.default, null)))),
            react_1.default.createElement(Box_1.default, { display: "flex", flex: 1, justifyContent: "flex-end" },
                showNotifications && notificationsNumber && (react_1.default.createElement(Notifications_1.Notifications, { amount: notificationsNumber, onClick: notificationsOnClick })),
                react_1.default.createElement(HeaderAccount_1.HeaderAccount, { avatar: avatar, text: text, subText: subText, menuOptions: headerMenuOptions })))));
};
exports.Navbar = Navbar;
//# sourceMappingURL=Navbar.js.map