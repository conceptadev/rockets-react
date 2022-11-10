"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const react_1 = __importStar(require("react"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
const Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
const VisibilityOff_1 = __importDefault(require("@mui/icons-material/VisibilityOff"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Text_1 = __importDefault(require("../Text"));
const TextField = (props) => {
    const { label, required, sx, type } = props;
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const togglePassword = () => {
        setShowPassword((prv) => !prv);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const isPassword = type === 'password';
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, color: "text.primary", textAlign: "left" },
            label,
            required && ' *'),
        react_1.default.createElement(TextField_1.default, Object.assign({}, props, { sx: Object.assign(Object.assign({}, sx), { marginTop: '4px', mb: 3, input: { color: 'text.primary' } }), size: "small", hiddenLabel: true, label: "", type: isPassword ? (showPassword ? 'text' : 'password') : type, InputProps: Object.assign({}, (isPassword && {
                endAdornment: (react_1.default.createElement(InputAdornment_1.default, { position: "end" },
                    react_1.default.createElement(IconButton_1.default, { "aria-label": "toggle password visibility", onClick: togglePassword, onMouseDown: handleMouseDownPassword }, showPassword ? react_1.default.createElement(Visibility_1.default, null) : react_1.default.createElement(VisibilityOff_1.default, null)))),
            })) }))));
};
exports.default = TextField;
//# sourceMappingURL=TextField.js.map