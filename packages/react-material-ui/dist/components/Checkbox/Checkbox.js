"use strict";
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
exports.Checkbox = void 0;
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const FormGroup_1 = __importDefault(require("@mui/material/FormGroup"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const Text_1 = __importDefault(require("../Text"));
const Checkbox = (props) => {
    const { label, checked, required, textProps = {
        fontSize: 16,
        fontWeight: 400,
        color: 'text.primary',
    } } = props, otherProps = __rest(props, ["label", "checked", "required", "textProps"]);
    return (react_1.default.createElement(react_1.default.Fragment, null, label ? (react_1.default.createElement(FormGroup_1.default, null,
        react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Checkbox_1.default, Object.assign({}, otherProps)), label: react_1.default.createElement(Text_1.default, Object.assign({ role: "label" }, textProps),
                label,
                required && ' *'), checked: checked }))) : (react_1.default.createElement(Checkbox_1.default, Object.assign({ checked: checked, required: required }, otherProps)))));
};
exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map