"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormTemplate = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../Text"));
const material_1 = require("@mui/material");
const FormTemplate = ({ title, subtitle, icon, children, titleTextProps, containerProps, subtitleTextProps, cardProps, }) => {
    return (react_1.default.createElement(material_1.Container, Object.assign({ maxWidth: "xs" }, containerProps, { sx: [
            {
                textAlign: 'center',
                padding: '48px 0',
            },
            ...(Array.isArray(containerProps === null || containerProps === void 0 ? void 0 : containerProps.sx)
                ? containerProps.sx
                : [containerProps === null || containerProps === void 0 ? void 0 : containerProps.sx]),
        ] }),
        icon && icon,
        title && (react_1.default.createElement(Text_1.default, Object.assign({ fontFamily: "Inter", fontSize: 30, fontWeight: 800, mt: 1, gutterBottom: true }, titleTextProps), title)),
        subtitle && (react_1.default.createElement(Text_1.default, Object.assign({ fontSize: 14, fontWeight: 500 }, subtitleTextProps), subtitle)),
        react_1.default.createElement(material_1.Card, Object.assign({}, cardProps, { sx: [
                {
                    marginTop: '26px',
                    padding: '24px 24px 24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                },
                ...(Array.isArray(cardProps === null || cardProps === void 0 ? void 0 : cardProps.sx) ? cardProps.sx : [cardProps === null || cardProps === void 0 ? void 0 : cardProps.sx]),
            ] }), children)));
};
exports.FormTemplate = FormTemplate;
//# sourceMappingURL=FormTemplate.js.map