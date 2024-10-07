"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBarNav = void 0;
const react_1 = __importDefault(require("react"));
const Navbar_1 = require("../Navbar");
const useAppBarRoot_1 = require("./hooks/useAppBarRoot");
const AppBarNav = (props) => {
    const { toggleMobileOpen } = (0, useAppBarRoot_1.useAppBarRoot)();
    return react_1.default.createElement(Navbar_1.Navbar, Object.assign({ drawerToggle: toggleMobileOpen }, props));
};
exports.AppBarNav = AppBarNav;
//# sourceMappingURL=AppBarNav.js.map