"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("../../components/Box"));
const IconButton_1 = __importDefault(require("../../components/IconButton"));
const AddCircleOutline_1 = __importDefault(require("@mui/icons-material/AddCircleOutline"));
const DeleteOutline_1 = __importDefault(require("@mui/icons-material/DeleteOutline"));
const ArrayFieldActionButton = (props) => {
    const { type, onClick } = props;
    return (react_1.default.createElement(Box_1.default, { sx: { marginTop: 3, marginLeft: 1 } },
        react_1.default.createElement(IconButton_1.default, { onClick: onClick }, type === 'add' ? (react_1.default.createElement(AddCircleOutline_1.default, { color: "primary" })) : (react_1.default.createElement(DeleteOutline_1.default, null)))));
};
exports.default = ArrayFieldActionButton;
//# sourceMappingURL=ArrayFieldActionButton.js.map