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
exports.Avatar = void 0;
const react_1 = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Styles_1 = require("./Styles");
const Text_1 = __importDefault(require("../Text"));
const Avatar = (props) => {
    const { src, alt, size = 30, initials, backgroundColor, onClick } = props;
    const [failed, setFailed] = (0, react_1.useState)(!src);
    const handleImageError = () => {
        setFailed(true);
    };
    const showInitials = failed && initials;
    return (react_1.default.createElement(Box_1.default, { sx: showInitials
            ? {}
            : {
                backgroundColor: backgroundColor || '#eee',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            } },
        react_1.default.createElement(Styles_1.Image, { src: src, alt: alt, size: size, onClick: onClick, onError: handleImageError, style: {
                display: showInitials ? 'none' : 'block',
                cursor: onClick ? 'pointer' : 'default',
            } }),
        showInitials && (react_1.default.createElement(Text_1.default, { fontSize: size * 0.44, fontWeight: 600 }, initials.substring(0, 2)))));
};
exports.Avatar = Avatar;
//# sourceMappingURL=Avatar.js.map