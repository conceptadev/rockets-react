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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProvider = exports.useNotifications = void 0;
const react_1 = __importStar(require("react"));
const NotificationContext = (0, react_1.createContext)({});
const useNotifications = () => (0, react_1.useContext)(NotificationContext);
exports.useNotifications = useNotifications;
const NotificationProvider = ({ children, }) => {
    const [notification, setNotification] = react_1.default.useState();
    react_1.default.useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification(undefined);
            }, 3000);
        }
    }, [notification]);
    return (react_1.default.createElement(NotificationContext.Provider, { value: { notification, notify: setNotification } }, children));
};
exports.NotificationProvider = NotificationProvider;
//# sourceMappingURL=index.js.map