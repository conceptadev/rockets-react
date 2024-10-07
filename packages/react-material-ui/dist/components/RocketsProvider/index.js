"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_data_provider_1 = require("@concepta/react-data-provider");
const react_auth_provider_1 = require("@concepta/react-auth-provider");
const styles_1 = require("../../styles");
const theme_1 = require("../../styles/theme");
const react_toastify_1 = require("react-toastify");
const inject_style_1 = require("react-toastify/dist/inject-style");
(0, inject_style_1.injectStyle)();
const RocketsProvider = ({ children, auth, dataProvider, theme, }) => {
    return (react_1.default.createElement(react_data_provider_1.ClientProvider, { baseUrl: dataProvider.apiUrl, onRefreshTokenError: auth.handleRefreshTokenError },
        react_1.default.createElement(styles_1.ThemeProvider, { theme: theme !== null && theme !== void 0 ? theme : theme_1.themeLight },
            react_1.default.createElement(react_toastify_1.ToastContainer, { hideProgressBar: true, position: "top-center", limit: 3, autoClose: 3000 }),
            react_1.default.createElement(react_auth_provider_1.AuthProvider, { onSuccess: auth.onAuthSuccess, onError: auth.onAuthError }, children))));
};
exports.default = RocketsProvider;
//# sourceMappingURL=index.js.map