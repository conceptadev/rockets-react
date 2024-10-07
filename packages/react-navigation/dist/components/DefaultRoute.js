"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute_1 = __importDefault(require("./ProtectedRoute"));
const AppBarContainer_1 = __importDefault(require("./AppBarContainer"));
const react_material_ui_1 = require("@concepta/react-material-ui/");
const DefaultRoute = ({ resource, name, useNavigateFilter = true, isUnprotected = false, showAppBar = true, module, page, items, drawerProps, navbarProps, renderAppBar, }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const resourceName = resource.substring(1);
    const menuItems = items.map((item) => (Object.assign(Object.assign({}, item), { onClick: () => (item === null || item === void 0 ? void 0 : item.id) && navigate(item.id) })));
    const content = module ? (react_1.default.createElement(react_material_ui_1.CrudModule, Object.assign({}, module, { resource: resourceName, title: module.title || name, navigate: useNavigateFilter ? navigate : undefined }))) : (page);
    const wrappedContent = showAppBar ? (renderAppBar ? (renderAppBar(menuItems, content)) : (react_1.default.createElement(AppBarContainer_1.default, { menuItems: menuItems, drawerProps: drawerProps, navbarProps: navbarProps }, content))) : (content);
    const finalContent = isUnprotected ? (wrappedContent) : (react_1.default.createElement(ProtectedRoute_1.default, null, wrappedContent));
    return react_1.default.createElement(react_1.default.Fragment, null, finalContent);
};
exports.default = DefaultRoute;
//# sourceMappingURL=DefaultRoute.js.map