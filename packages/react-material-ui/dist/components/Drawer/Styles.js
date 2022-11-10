"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerButton = exports.Drawer = void 0;
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const styles_1 = require("@mui/material/styles");
exports.Drawer = (0, styles_1.styled)(Drawer_1.default)(({ theme, open }) => ({
    '& .MuiDrawer-paper': Object.assign({ backgroundColor: theme.system.drawerBg, position: 'relative', whiteSpace: 'nowrap', width: 256, transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }), boxSizing: 'border-box' }, (!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    })),
}));
exports.DrawerButton = (0, styles_1.styled)(Button_1.default)(({ theme, active, collapsed }) => ({
    color: theme.system.drawerButtonText,
    margin: '2px 8px',
    padding: '8px',
    minWidth: 0,
    textTransform: 'none',
    textAlign: 'left',
    justifyContent: 'start',
    backgroundColor: active ? theme.system.drawerButtonBg : 'transparent',
    '&:hover': {
        backgroundColor: theme.system.drawerButtonBg,
    },
    '& svg': {
        marginRight: collapsed ? 0 : 12,
        transform: `translateX(${collapsed ? '8px' : 0})`,
        transition: 'all 300ms',
    },
    '& p': {
        opacity: collapsed ? 0 : 1,
        transition: 'opacity 300ms',
    },
}));
//# sourceMappingURL=Styles.js.map