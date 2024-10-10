"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const react_router_dom_1 = require("react-router-dom");
const DefaultRoute_1 = __importDefault(require("./DefaultRoute"));
const AuthRoute_1 = __importDefault(require("./AuthRoute"));
const Router = ({ children, rootElement, useNavigateFilter, initialRoute, useMemoryRouter = false, authModuleProps, drawerProps, navbarProps, renderAppBar, renderSignIn, renderSignUp, renderForgotPassword, renderResetPassword, }) => {
    const items = react_1.Children.map(children, (child) => {
        if (child.props.showDrawerItem !== undefined &&
            !child.props.showDrawerItem) {
            return null;
        }
        return {
            id: child.props.id,
            text: child.props.name,
            icon: child.props.icon,
        };
    }).filter((item) => !!item);
    const home = children[0].props.id;
    const createRouter = useMemoryRouter
        ? react_router_dom_1.createMemoryRouter
        : react_router_dom_1.createBrowserRouter;
    const router = createRouter([
        {
            path: '/',
            element: rootElement ? (react_1.default.cloneElement(rootElement, {}, react_1.default.createElement("div", null,
                "Home test root",
                react_1.default.createElement(react_router_dom_1.Outlet, null),
                react_1.default.createElement(react_router_dom_1.Navigate, { to: initialRoute !== null && initialRoute !== void 0 ? initialRoute : home, replace: true })))) : (react_1.default.createElement("div", null,
                "Home test no root",
                react_1.default.createElement(react_router_dom_1.Outlet, null))),
            children: [
                {
                    path: 'sign-in',
                    element: renderSignIn ? (renderSignIn(home)) : (react_1.default.createElement(AuthRoute_1.default, { home: home, moduleProps: authModuleProps === null || authModuleProps === void 0 ? void 0 : authModuleProps.signIn, route: "signIn" })),
                },
                {
                    path: 'sign-up',
                    element: renderSignUp ? (renderSignUp(home)) : (react_1.default.createElement(AuthRoute_1.default, { home: home, moduleProps: authModuleProps === null || authModuleProps === void 0 ? void 0 : authModuleProps.signUp, route: "signUp" })),
                },
                {
                    path: 'forgot-password',
                    element: renderForgotPassword ? (renderForgotPassword(home)) : (react_1.default.createElement(AuthRoute_1.default, { home: home, moduleProps: authModuleProps === null || authModuleProps === void 0 ? void 0 : authModuleProps.forgotPassword, route: 'forgotPassword' })),
                },
                {
                    path: 'reset-password',
                    element: renderResetPassword ? (renderResetPassword(home)) : (react_1.default.createElement(AuthRoute_1.default, { home: home, moduleProps: authModuleProps === null || authModuleProps === void 0 ? void 0 : authModuleProps.resetPassword, route: "resetPassword" })),
                },
                ...react_1.Children.map(children, (child) => ({
                    path: child.props.id,
                    element: (react_1.default.createElement(DefaultRoute_1.default, { renderAppBar: renderAppBar, isUnprotected: child.props.isUnprotected, useNavigateFilter: useNavigateFilter, resource: child.props.id, name: child.props.name, showAppBar: child.props.showAppBar, module: child.props.module, page: child.props.page, items: items, drawerProps: drawerProps, navbarProps: navbarProps })),
                })),
            ],
        },
    ]);
    return react_1.default.createElement(react_router_dom_1.RouterProvider, { router: router });
};
exports.default = Router;
//# sourceMappingURL=Router.js.map