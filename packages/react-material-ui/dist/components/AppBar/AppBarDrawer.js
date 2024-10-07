"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBarDrawer = void 0;
const react_1 = __importDefault(require("react"));
const Drawer_1 = require("../Drawer");
const useAppBarRoot_1 = require("./hooks/useAppBarRoot");
const AppBarDrawer = (props) => {
    const { isMobileOpen, toggleMobileOpen } = (0, useAppBarRoot_1.useAppBarRoot)();
    return (react_1.default.createElement(Drawer_1.Drawer, Object.assign({ mobileIsOpen: isMobileOpen, onMobileClose: toggleMobileOpen }, props)));
};
exports.AppBarDrawer = AppBarDrawer;
//# sourceMappingURL=AppBarDrawer.js.map