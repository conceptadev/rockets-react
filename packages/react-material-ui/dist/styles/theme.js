"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeDark = exports.themeLight = void 0;
const createTheme_1 = __importDefault(require("./createTheme"));
exports.themeLight = (0, createTheme_1.default)({
    system: {
        drawerBg: '#1F2937',
        drawerButtonText: '#D1D5DB',
        drawerButtonBg: '#111827',
    },
    palette: {
        primary: {
            main: '#2563EB',
            dark: '#1D4ED8',
        },
        background: {
            default: '#f9fafb',
        },
        text: {
            primary: '#374151',
            secondary: '#9CA3AF',
        },
    },
});
exports.themeDark = (0, createTheme_1.default)({
    system: {
        drawerBg: '#1F2937',
        drawerButtonText: '#D1D5DB',
        drawerButtonBg: '#111827',
    },
    palette: {
        mode: 'dark',
        text: {
            primary: '#c8cdd6',
            secondary: '#c2c6cc',
        },
    },
});
//# sourceMappingURL=theme.js.map