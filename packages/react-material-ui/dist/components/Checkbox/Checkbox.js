"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const FormGroup_1 = __importDefault(require("@mui/material/FormGroup"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const Checkbox = (props) => {
    const { label, checked } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null, label ? (react_1.default.createElement(FormGroup_1.default, null,
        react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Checkbox_1.default, { onChange: props.onChange }), label: label, checked: checked }))) : (react_1.default.createElement(Checkbox_1.default, Object.assign({}, props, { sx: Object.assign({}, props.sx) })))));
};
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map