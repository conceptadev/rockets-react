"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextField_1 = __importDefault(require("../../components/TextField"));
const utils_1 = require("./utils");
const CustomTextFieldWidget = (props) => (react_1.default.createElement(TextField_1.default, Object.assign({}, (0, utils_1.filterProps)(props), { variant: "outlined", margin: "normal", fullWidth: true, color: "info", sx: Object.assign(Object.assign({}, props.sx), { marginTop: '4px', mb: 0 }), value: props.value, onChange: (event) => props.onChange(event.target.value) })));
exports.default = CustomTextFieldWidget;
//# sourceMappingURL=CustomTextFieldWidget.js.map