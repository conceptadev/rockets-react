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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.PublicRoute = exports.ProtectedRoute = exports.Route = exports.useNavigate = void 0;
const react_1 = __importDefault(require("react"));
const ReactRouter = __importStar(require("react-router-dom"));
const react_2 = require("react");
exports.useNavigate = ReactRouter.useNavigate;
const Route = (props) => {
    return null;
};
exports.Route = Route;
const ProtectedRoute = (props) => {
    return null;
};
exports.ProtectedRoute = ProtectedRoute;
exports.PublicRoute = exports.Route;
const Router = ({ children, isAuth, NotFoundComponent, UnauthorizedComponent, }) => {
    const enhancedChildren = (0, react_2.useMemo)(() => {
        return react_2.Children.map(children, (child) => {
            const _a = child === null || child === void 0 ? void 0 : child.props, { Component, requireAuth } = _a, restProps = __rest(_a, ["Component", "requireAuth"]);
            if (!requireAuth && child.type.name !== 'ProtectedRoute') {
                return (react_1.default.createElement(ReactRouter.Route, Object.assign({}, restProps, { element: react_1.default.createElement(Component, Object.assign({}, restProps)) })));
            }
            if (!isAuth) {
                return (react_1.default.createElement(ReactRouter.Route, Object.assign({}, restProps, { element: react_1.default.createElement(ReactRouter.Navigate, { to: "/unauthorized" }) })));
            }
            return (react_1.default.createElement(ReactRouter.Route, Object.assign({}, restProps, { element: react_1.default.createElement(Component, Object.assign({}, restProps)) })));
        });
    }, [children, isAuth]);
    return (react_1.default.createElement(ReactRouter.BrowserRouter, null,
        react_1.default.createElement(ReactRouter.Routes, null,
            react_1.default.createElement(react_1.default.Fragment, null,
                ...enhancedChildren,
                react_1.default.createElement(ReactRouter.Route, { path: "/unauthorized", element: react_1.default.createElement(UnauthorizedComponent, null) }),
                react_1.default.createElement(ReactRouter.Route, { path: "/not-found", element: react_1.default.createElement(NotFoundComponent, null) }),
                react_1.default.createElement(ReactRouter.Route, { path: "*", element: react_1.default.createElement(ReactRouter.Navigate, { to: "/not-found" }) })))));
};
exports.Router = Router;
//# sourceMappingURL=index.js.map