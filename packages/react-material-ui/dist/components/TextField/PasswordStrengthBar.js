"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordStrengthBarVariants = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const VARIANT_COLOR_MAPPING = {
    veryWeak: 'lightgray',
    weak: 'red',
    medium: 'yellow',
    great: 'green',
};
var PasswordStrengthBarVariants;
(function (PasswordStrengthBarVariants) {
    PasswordStrengthBarVariants["VeryWeak"] = "veryWeak";
    PasswordStrengthBarVariants["Weak"] = "weak";
    PasswordStrengthBarVariants["Medium"] = "medium";
    PasswordStrengthBarVariants["Great"] = "great";
})(PasswordStrengthBarVariants = exports.PasswordStrengthBarVariants || (exports.PasswordStrengthBarVariants = {}));
const PasswordStrengthBar = ({ variant = PasswordStrengthBarVariants.VeryWeak, }) => {
    return (react_1.default.createElement(material_1.Box, { sx: {
            height: '4px',
            background: VARIANT_COLOR_MAPPING[variant],
            borderRadius: 1,
            width: '100%',
        } }));
};
exports.default = PasswordStrengthBar;
//# sourceMappingURL=PasswordStrengthBar.js.map