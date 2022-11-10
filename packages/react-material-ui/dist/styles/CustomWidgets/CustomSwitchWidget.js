"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Switch_1 = __importDefault(require("../../components/Switch"));
const CustomSwitchWidget = (props) => (react_1.default.createElement(Switch_1.default, { checked: props.value, label: props.label, onChange: (evt) => props.onChange(evt.target.checked) }));
exports.default = CustomSwitchWidget;
//# sourceMappingURL=CustomSwitchWidget.js.map