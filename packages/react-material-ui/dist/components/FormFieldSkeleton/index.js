"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldSkeleton = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const FormFieldSkeleton = ({ isLoading = true, children, hideLabel, }) => {
    const theme = (0, material_1.useTheme)();
    if (!isLoading)
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    return (react_1.default.createElement(material_1.Box, { width: "100%" },
        !hideLabel && (react_1.default.createElement(material_1.Skeleton, { variant: "text", width: 80, sx: {
                fontSize: theme.typography.body1.fontSize,
            }, "data-testid": "form-field-skeleton-label" })),
        react_1.default.createElement(material_1.Skeleton, { variant: "rounded", height: 42, width: "100%", "data-testid": "form-field-skeleton-input" }, children)));
};
exports.FormFieldSkeleton = FormFieldSkeleton;
//# sourceMappingURL=index.js.map