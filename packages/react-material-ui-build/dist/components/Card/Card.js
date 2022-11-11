"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Card_1 = __importDefault(require("@mui/material/Card"));
const Card = (props) => {
    const { children } = props;
    return react_1.default.createElement(Card_1.default, Object.assign({}, props), children);
};
exports.default = Card;
//# sourceMappingURL=Card.js.map