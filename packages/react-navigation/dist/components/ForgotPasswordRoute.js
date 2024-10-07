"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const react_auth_provider_1 = require("@concepta/react-auth-provider");
const react_material_ui_1 = require("@concepta/react-material-ui/");
const react_toastify_1 = require("react-toastify");
const ForgotPasswordRoute = ({ home, moduleProps, }) => {
    const { accessToken: authAccessToken } = (0, react_auth_provider_1.useAuth)();
    const accessToken = authAccessToken !== null && authAccessToken !== void 0 ? authAccessToken : localStorage.getItem('accessToken');
    if (accessToken) {
        return react_1.default.createElement(react_router_1.Navigate, { to: home, replace: true });
    }
    return (react_1.default.createElement(react_material_ui_1.AuthModule, Object.assign({ route: "forgotPassword", signInPath: "/sign-in", query: {
            onSuccess: () => react_toastify_1.toast.success('Success!'),
            onError: (error) => {
                var _a, _b;
                return react_toastify_1.toast.error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                    'An error has occurred. Please try again later or contact support for assistance.');
            },
        } }, (moduleProps || {}))));
};
exports.default = ForgotPasswordRoute;
//# sourceMappingURL=ForgotPasswordRoute.js.map