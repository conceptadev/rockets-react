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
const AuthRoute = (props) => {
    var _a, _b, _c, _d;
    const { home, moduleProps, route } = props;
    const { accessToken: authAccessToken } = (0, react_auth_provider_1.useAuth)();
    const accessToken = authAccessToken !== null && authAccessToken !== void 0 ? authAccessToken : localStorage.getItem('accessToken');
    if (accessToken) {
        return react_1.default.createElement(react_router_1.Navigate, { to: home, replace: true });
    }
    const query = Object.assign({ onSuccess: () => react_toastify_1.toast.success('Success!'), onError: (error) => {
            var _a, _b;
            return react_toastify_1.toast.error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                'An error has occurred. Please try again later or contact support for assistance.');
        } }, (_a = props.moduleProps) === null || _a === void 0 ? void 0 : _a.query);
    const routeProps = {
        resetPassword: {
            route: 'resetPassword',
            signInPath: '/sign-in',
            query,
        },
        forgotPassword: {
            route: 'forgotPassword',
            signInPath: '/sign-in',
            query,
        },
        signIn: {
            route: 'signIn',
        },
        signUp: {
            route: 'signUp',
            signInPath: '/sign-in',
            query,
        },
    };
    return (react_1.default.createElement(react_material_ui_1.AuthModule, Object.assign({}, routeProps[route], Object.assign(Object.assign({}, moduleProps), { query: ((_b = props.moduleProps) === null || _b === void 0 ? void 0 : _b.overrideDefaults) && ((_c = props.moduleProps) === null || _c === void 0 ? void 0 : _c.query)
            ? (_d = props.moduleProps) === null || _d === void 0 ? void 0 : _d.query
            : routeProps[route].query }))));
};
exports.default = AuthRoute;
//# sourceMappingURL=AuthRoute.js.map