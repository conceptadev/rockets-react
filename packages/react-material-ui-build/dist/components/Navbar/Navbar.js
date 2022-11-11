"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const Box_1 = __importDefault(require("../Box"));
const Notifications_1 = __importDefault(require("../Notifications"));
const HeaderAccount_1 = __importDefault(require("../HeaderAccount"));
const Text_1 = __importDefault(require("../Text"));
const Navbar = ({ drawerToggle, showNotifications, notificationsNumber, notificationsOnClick, avatar, text, subText, }) => {
    return (react_1.default.createElement(Styles_1.Navbar, null,
        react_1.default.createElement(Styles_1.Toolbar, null,
            react_1.default.createElement(react_1.default.Fragment, null,
                drawerToggle && (react_1.default.createElement(Text_1.default, { color: "text.primary" },
                    react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: drawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
                        react_1.default.createElement(Menu_1.default, null)))),
                react_1.default.createElement(Box_1.default, { display: "flex", flex: 1, justifyContent: "flex-end" },
                    showNotifications && (react_1.default.createElement(Notifications_1.default, { amount: notificationsNumber, onClick: notificationsOnClick })),
                    react_1.default.createElement(HeaderAccount_1.default, { avatar: avatar, text: text, subText: subText }))))));
};
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map