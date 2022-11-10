"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconContainer = exports.Table = void 0;
const Table_1 = __importDefault(require("@mui/material/Table"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const contained = (theme) => ({
    borderSpacing: '0 10px',
    marginTop: '-10px',
    th: {
        border: 'none',
    },
    td: {
        border: `solid 1px ${theme.palette.primary.main}`,
        borderStyle: 'solid none',
        padding: '10px',
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
    },
    'td:first-child': {
        borderLeftStyle: 'solid',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
    },
    'td:last-child': {
        borderRightStyle: 'solid',
        borderBottomRightRadius: '10px',
        borderTopRightRadius: '10px',
    },
});
const outlined = (theme) => ({
    th: {
        border: `solid 1px #e5e7eb`,
        borderStyle: 'solid none',
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        '&:first-child': {
            borderTopLeftRadius: '10px',
            borderLeftStyle: 'solid',
        },
        '&:last-child': {
            borderTopRightRadius: '10px',
            borderRightStyle: 'solid',
        },
    },
    td: {
        '&:first-child': {
            borderLeft: 'solid 1px #e5e7eb',
        },
        '&:last-child': {
            borderRight: 'solid 1px #e5e7eb',
        },
    },
});
const variantSettings = (variant, theme) => {
    if (variant === 'contained') {
        return contained(theme);
    }
    if (variant === 'outlined') {
        return outlined(theme);
    }
};
exports.Table = (0, styles_1.styled)(Table_1.default)(({ theme, variant }) => (Object.assign({ borderCollapse: 'separate' }, variantSettings(variant, theme))));
exports.IconContainer = (0, styles_1.styled)(Box_1.default)(() => ({
    display: 'flex',
    marginRight: '8px',
    marginLeft: '-4px',
}));
//# sourceMappingURL=Styles.js.map