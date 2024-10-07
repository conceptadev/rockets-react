"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("@rjsf/utils");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ArrayFieldActionButton_1 = __importDefault(require("./ArrayFieldActionButton"));
function ArrayFieldTemplate(props) {
    var _a;
    const { items, canAdd, onAddClick, registry, uiSchema, schema, required, idSchema, title, } = props;
    const uiOptions = (0, utils_1.getUiOptions)(uiSchema);
    const ArrayFieldTitleTemplate = (0, utils_1.getTemplate)('ArrayFieldTitleTemplate', registry, uiOptions);
    return (react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column", sx: {
            '& .MuiGrid-container': {
                marginTop: '0 !important',
            },
            '& .field': {
                flex: 1,
            },
        } },
        react_1.default.createElement(ArrayFieldTitleTemplate, { idSchema: idSchema, title: (_a = uiOptions.title) !== null && _a !== void 0 ? _a : title, schema: schema, uiSchema: uiSchema, required: required, registry: registry }),
        items.map((el, i) => {
            const child = Object.assign(Object.assign({}, el.children), { props: Object.assign(Object.assign({}, el.children.props), { required: props.required }) });
            return (react_1.default.createElement(Box_1.default, { key: el.key, display: "flex", mt: 2 },
                child,
                i === 0 && canAdd && (react_1.default.createElement(ArrayFieldActionButton_1.default, { type: "add", onClick: onAddClick })),
                i > 0 && el.hasRemove && (react_1.default.createElement(ArrayFieldActionButton_1.default, { type: "remove", onClick: () => {
                        el.onDropIndexClick(i)();
                    } }))));
        }),
        schema.description && (react_1.default.createElement(Typography_1.default, { component: "span", variant: "caption", color: "#9CA3AF" }, schema.description))));
}
exports.default = ArrayFieldTemplate;
//# sourceMappingURL=ArrayFieldTemplate.js.map