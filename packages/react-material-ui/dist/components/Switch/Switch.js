"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const react_1 = __importDefault(require("react"));
const Switch_1 = __importDefault(require("@mui/material/Switch"));
const FormGroup_1 = __importDefault(require("@mui/material/FormGroup"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const Text_1 = __importDefault(require("../Text"));
const Switch = (props) => {
    const { label, disabled, checked, onChange, required, textProps = {
        fontSize: 16,
        fontWeight: 400,
        color: 'text.primary',
    }, } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null, label ? (react_1.default.createElement(FormGroup_1.default, null,
        react_1.default.createElement(FormControlLabel_1.default, { disabled: disabled, control: react_1.default.createElement(Switch_1.default, { onChange: onChange }), label: react_1.default.createElement(Text_1.default, Object.assign({}, textProps),
                label,
                required && ' *'), checked: checked }))) : (react_1.default.createElement(Switch_1.default, Object.assign({}, props)))));
};
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map