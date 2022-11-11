"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("../../components/Checkbox"));
const CustomCheckboxWidget = (props) => (react_1.default.createElement(Checkbox_1.default, { checked: props.value, label: props.label, onChange: (evt) => props.onChange(evt.target.checked) }));
exports.default = CustomCheckboxWidget;
//# sourceMappingURL=CustomCheckboxWidget.js.map