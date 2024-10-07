"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const PasswordStrengthBar_1 = __importDefault(require("./PasswordStrengthBar"));
const PasswordStrength = ({ passwordRuleVariant, passwordStrengthText, renderStrengthBar, }) => {
    if (renderStrengthBar) {
        return react_1.default.createElement(react_1.default.Fragment, null, renderStrengthBar(passwordRuleVariant, passwordStrengthText));
    }
    return (react_1.default.createElement(material_1.Box, { mt: 1 },
        react_1.default.createElement(material_1.Box, { display: "flex", gap: 2 }, [...Array(4)].map((_, index) => (react_1.default.createElement(PasswordStrengthBar_1.default, { key: `password-bar-${index}`, variant: passwordRuleVariant })))),
        react_1.default.createElement(material_1.Typography, { textAlign: "end", color: "grey.400", variant: "subtitle2", mt: 0.5 }, passwordStrengthText)));
};
exports.default = PasswordStrength;
//# sourceMappingURL=PasswordStrength.js.map