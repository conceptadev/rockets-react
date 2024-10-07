"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormLabel = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Text_1 = __importDefault(require("../Text"));
const TEXT_INITIAL_PROPS = {
    fontSize: 14,
    fontWeight: 500,
    color: 'text.primary',
};
const FormLabel = (props) => {
    const { id, name, labelProps, label, required } = props;
    return (react_1.default.createElement(material_1.FormLabel, { id: id, htmlFor: name, sx: {
            width: '100%',
        } },
        react_1.default.createElement(Text_1.default, Object.assign({ textAlign: "left" }, TEXT_INITIAL_PROPS, labelProps), label && `${label}${required ? ' *' : ''}`)));
};
exports.FormLabel = FormLabel;
exports.default = exports.FormLabel;
//# sourceMappingURL=index.js.map