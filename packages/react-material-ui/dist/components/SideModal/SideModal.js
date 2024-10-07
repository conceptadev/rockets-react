"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideModal = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const Text_1 = __importDefault(require("../Text"));
const SideModal = (props) => {
    const { open, toggleDrawer, title, textProps = {
        fontSize: 18,
        fontWeight: 500,
        color: 'common.white',
        fontFamily: "'Inter', sans-serif",
    }, backgroundColor, headerBackgroundColor, closeIconColor, width, anchor = 'right', sx, children, } = props;
    const theme = (0, material_1.useTheme)();
    return (react_1.default.createElement(Drawer_1.default, { anchor: anchor, variant: "temporary", open: open, onClose: toggleDrawer, sx: [
            {
                '& .MuiDrawer-paper': {
                    backgroundColor: backgroundColor || theme.palette.common.white,
                    width: width || '33%',
                    minWidth: width || '448px',
                    [theme.breakpoints.down('sm')]: {
                        width: width || '100%',
                        minWidth: 'auto',
                    },
                },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ], "data-testid": "side-modal" },
        react_1.default.createElement(Box_1.default, { display: "flex", alignItems: "center", justifyContent: "center", sx: (theme) => ({
                backgroundColor: headerBackgroundColor || theme.palette.primary.main,
                padding: '16px 16px 16px 24px',
            }), "data-testid": "side-modal-header" },
            title && react_1.default.createElement(Text_1.default, Object.assign({}, textProps), title),
            react_1.default.createElement(IconButton_1.default, { onClick: toggleDrawer, sx: {
                    marginLeft: 'auto',
                    color: closeIconColor || theme.palette.common.white,
                }, "data-testid": "side-modal-close-button" },
                react_1.default.createElement(Close_1.default, null))),
        children));
};
exports.SideModal = SideModal;
//# sourceMappingURL=SideModal.js.map