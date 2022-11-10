"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const NotificationsOutlined_1 = __importDefault(require("@mui/icons-material/NotificationsOutlined"));
const Badge_1 = __importDefault(require("@mui/material/Badge"));
const Notifications = ({ amount, onClick }) => (react_1.default.createElement(IconButton_1.default, { sx: { color: 'text.secondary' }, onClick: onClick },
    react_1.default.createElement(Badge_1.default, { badgeContent: amount, color: "error" },
        react_1.default.createElement(NotificationsOutlined_1.default, null))));
exports.default = Notifications;
//# sourceMappingURL=Notifications.js.map