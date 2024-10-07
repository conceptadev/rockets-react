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
exports.TextField = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
const VisibilityOff_1 = __importDefault(require("@mui/icons-material/VisibilityOff"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const FormLabel_1 = require("../FormLabel");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const PasswordStrengthRules_1 = __importDefault(require("./PasswordStrengthRules"));
const PasswordStrength_1 = __importDefault(require("./PasswordStrength"));
const TextField = (props) => {
    var _a, _b, _c, _d;
    const { label, required, sx, type, size, value, hiddenLabel, options, containerProps, labelProps, InputProps, InputLabelProps, name, passwordStrengthConfig } = props, rest = __rest(props, ["label", "required", "sx", "type", "size", "value", "hiddenLabel", "options", "containerProps", "labelProps", "InputProps", "InputLabelProps", "name", "passwordStrengthConfig"]);
    const passwordStrengthConfigDefault = {
        hideStrengthBar: (_a = passwordStrengthConfig === null || passwordStrengthConfig === void 0 ? void 0 : passwordStrengthConfig.hideStrengthBar) !== null && _a !== void 0 ? _a : true,
        hideRulesText: (_b = passwordStrengthConfig === null || passwordStrengthConfig === void 0 ? void 0 : passwordStrengthConfig.hideRulesText) !== null && _b !== void 0 ? _b : true,
        rules: (_c = passwordStrengthConfig === null || passwordStrengthConfig === void 0 ? void 0 : passwordStrengthConfig.rules) !== null && _c !== void 0 ? _c : constants_1.PASSWORD_DEFAULT_RULES,
        matchRules: (_d = passwordStrengthConfig === null || passwordStrengthConfig === void 0 ? void 0 : passwordStrengthConfig.matchRules) !== null && _d !== void 0 ? _d : constants_1.PASSWORD_MATCH_RULES,
        renderStrengthBar: passwordStrengthConfig === null || passwordStrengthConfig === void 0 ? void 0 : passwordStrengthConfig.renderStrengthBar,
        renderRulesText: passwordStrengthConfig === null || passwordStrengthConfig === void 0 ? void 0 : passwordStrengthConfig.renderRulesText,
    };
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const togglePassword = () => {
        setShowPassword((prv) => !prv);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const isPassword = type === 'password';
    const ishiddenLabel = hiddenLabel || (options === null || options === void 0 ? void 0 : options.hiddenLabel);
    const passwordScore = (0, utils_1.getPasswordScore)(value, passwordStrengthConfigDefault.rules);
    const [passwordStrengthText, passwordRuleVariant] = (0, utils_1.getPasswordMatchInfo)(passwordScore, passwordStrengthConfigDefault.matchRules);
    return (react_1.default.createElement(material_1.Box, Object.assign({}, containerProps),
        react_1.default.createElement(material_1.FormControl, { hiddenLabel: label ? true : ishiddenLabel, fullWidth: true },
            !ishiddenLabel && !!label && typeof label === 'string' && (react_1.default.createElement(FormLabel_1.FormLabel, Object.assign({ name: name, label: label, required: required, labelProps: labelProps }, InputLabelProps))),
            !ishiddenLabel && !!label && typeof label !== 'string' && label,
            react_1.default.createElement(material_1.OutlinedInput, Object.assign({}, rest, { sx: [
                    {
                        marginTop: 0.5,
                        mb: 0,
                        input: { color: 'text.primary' },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ], id: name, name: name, size: size || 'small', value: value || value === 0 ? value : '', type: isPassword ? (showPassword ? 'text' : 'password') : type, endAdornment: isPassword && (react_1.default.createElement(material_1.InputAdornment, { position: "end" },
                    react_1.default.createElement(IconButton_1.default, { "aria-label": "toggle password visibility", onClick: togglePassword, onMouseDown: handleMouseDownPassword, "data-testid": "toggle-password-button" }, showPassword ? react_1.default.createElement(Visibility_1.default, null) : react_1.default.createElement(VisibilityOff_1.default, null)))), "data-testid": "text-field", fullWidth: true }, InputProps))),
        isPassword && (react_1.default.createElement(react_1.default.Fragment, null,
            !passwordStrengthConfigDefault.hideStrengthBar && (react_1.default.createElement(PasswordStrength_1.default, { passwordRuleVariant: passwordRuleVariant, passwordStrengthText: passwordStrengthText, renderStrengthBar: passwordStrengthConfigDefault.renderStrengthBar })),
            !passwordStrengthConfigDefault.hideRulesText && (react_1.default.createElement(PasswordStrengthRules_1.default, { name: name, value: value, rules: passwordStrengthConfigDefault.rules, renderRulesText: passwordStrengthConfigDefault.renderRulesText }))))));
};
exports.TextField = TextField;
//# sourceMappingURL=TextField.js.map