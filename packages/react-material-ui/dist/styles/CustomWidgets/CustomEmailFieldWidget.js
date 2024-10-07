"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CustomTextFieldWidget_1 = __importDefault(require("./CustomTextFieldWidget"));
const CustomEmailFieldWidget = (props) => (react_1.default.createElement(CustomTextFieldWidget_1.default, Object.assign({}, props, { type: "email" })));
exports.default = CustomEmailFieldWidget;
//# sourceMappingURL=CustomEmailFieldWidget.js.map