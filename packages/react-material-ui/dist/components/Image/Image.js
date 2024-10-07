"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Image = (props) => {
    const { imgFluid, defaultImage, onLoad, onError, sx } = props, otherProps = __rest(props, ["imgFluid", "defaultImage", "onLoad", "onError", "sx"]);
    const imageOnLoadHandler = (event) => {
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(event);
    };
    const imageOnErrorHandler = (event) => {
        onError === null || onError === void 0 ? void 0 : onError(event);
        if (defaultImage) {
            event.currentTarget.src = defaultImage;
        }
    };
    return (react_1.default.createElement(material_1.Box, Object.assign({ component: "img" }, otherProps, { sx: [
            ...(imgFluid ? [{ width: '100%', height: 'auto' }] : []),
            ...(Array.isArray(sx) ? sx : [sx]),
        ], onLoad: imageOnLoadHandler, onError: imageOnErrorHandler })));
};
exports.Image = Image;
//# sourceMappingURL=Image.js.map