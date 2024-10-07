"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_auth_provider_1 = require("@concepta/react-auth-provider");
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const ProtectedRoute = ({ children, redirectPath = '/sign-in', }) => {
    const { accessToken: authAccessToken } = (0, react_auth_provider_1.useAuth)();
    const accessToken = authAccessToken !== null && authAccessToken !== void 0 ? authAccessToken : localStorage.getItem('accessToken');
    if (!accessToken) {
        return react_1.default.createElement(react_router_1.Navigate, { to: redirectPath, replace: true });
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.default = ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.js.map