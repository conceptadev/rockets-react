"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeDark = exports.themeLight = void 0;
const styles_1 = require("@mui/material/styles");
exports.themeLight = (0, styles_1.createTheme)({
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
exports.themeDark = (0, styles_1.createTheme)({
    palette: {
        mode: 'dark',
        text: {
            primary: '#c8cdd6',
            secondary: '#c2c6cc',
        },
    },
});
//# sourceMappingURL=theme.js.map