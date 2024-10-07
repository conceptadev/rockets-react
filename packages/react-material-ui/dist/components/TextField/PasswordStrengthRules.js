"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const PasswordStrengthRules = ({ name, value, rules, renderRulesText, }) => {
    if (renderRulesText) {
        return react_1.default.createElement(react_1.default.Fragment, null, renderRulesText(name, value, rules));
    }
    return (react_1.default.createElement(material_1.Box, { mt: 2 },
        react_1.default.createElement(material_1.FormHelperText, { sx: (theme) => ({
                color: theme.palette.common.black,
            }) }, "Password should contain at least:"), rules === null || rules === void 0 ? void 0 :
        rules.map((rule) => (react_1.default.createElement(material_1.FormHelperText, { id: name, sx: (theme) => ({
                color: value && (value === null || value === void 0 ? void 0 : value.match(rule.pattern))
                    ? theme.palette.success.main
                    : theme.palette.common.black,
            }) }, rule.label)))));
};
exports.default = PasswordStrengthRules;
//# sourceMappingURL=PasswordStrengthRules.js.map