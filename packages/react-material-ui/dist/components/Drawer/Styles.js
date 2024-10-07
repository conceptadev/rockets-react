"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerButton = exports.StyledDrawer = void 0;
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
exports.StyledDrawer = (0, styles_1.styled)(Drawer_1.default, {
    shouldForwardProp: (prop) => !['backgroundColor', 'collapsedWidth', 'expandedWidth'].some((propName) => propName === prop),
})(({ theme, open, sx, horizontal, backgroundColor, collapsedWidth, expandedWidth, }) => [
    {
        '& .MuiDrawer-paper': Object.assign({ backgroundColor: backgroundColor || theme.palette.primary.dark, position: 'relative', whiteSpace: 'nowrap', width: expandedWidth || (horizontal ? 256 : 120), transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }), boxSizing: 'border-box' }, (!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: collapsedWidth || theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: collapsedWidth || theme.spacing(9),
            },
        })),
    },
    ...(Array.isArray(sx) ? sx : [sx]),
]);
exports.DrawerButton = (0, styles_1.styled)(Button_1.default, {
    shouldForwardProp: (prop) => !['active', 'collapsed', 'iconColor', 'activeIconColor'].some((propName) => propName === prop),
})(({ theme, active, collapsed, sx, horizontal, iconColor, activeIconColor, }) => {
    let _iconColor = iconColor || (0, material_1.alpha)(theme.palette.common.white, 0.65);
    if (active) {
        _iconColor = activeIconColor || theme.palette.common.white;
    }
    const paddingBottom = () => {
        if (horizontal) {
            return '8px';
        }
        if (collapsed) {
            return '6px';
        }
        return '18px';
    };
    return [
        {
            color: active
                ? theme.palette.common.white
                : (0, material_1.alpha)(theme.palette.common.white, 0.85),
            display: 'flex',
            flexDirection: horizontal ? 'row' : 'column',
            justifyContent: 'start',
            alignItems: 'center',
            whiteSpace: horizontal ? 'nowrap' : 'break-spaces',
            margin: '2px 8px',
            paddingX: '8px',
            paddingTop: '8px',
            paddingBottom: paddingBottom(),
            minWidth: 0,
            overflow: 'hidden',
            textTransform: 'none',
            textAlign: 'left',
            maxHeight: collapsed ? '40px' : '85px',
            transition: 'max-height 300ms, padding-bottom 300ms',
            backgroundColor: active
                ? (0, material_1.alpha)(theme.palette.common.black, 0.2)
                : 'transparent',
            '&:hover': {
                backgroundColor: (0, material_1.alpha)(theme.palette.common.black, 0.2),
            },
            '& svg': {
                color: _iconColor,
                marginRight: !collapsed && horizontal ? 12 : 0,
                marginBottom: !collapsed && !horizontal ? 6 : 0,
                transform: `translateX(${collapsed && horizontal ? '8px' : 0})`,
                transition: 'all 300ms',
            },
            '& p': {
                opacity: collapsed ? 0 : 1,
                transition: 'opacity 300ms',
            },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
    ];
});
//# sourceMappingURL=Styles.js.map