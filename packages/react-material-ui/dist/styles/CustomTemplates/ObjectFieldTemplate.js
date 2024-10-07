"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const utils_1 = require("@rjsf/utils");
function ObjectFieldTemplate(props) {
    const { description, title, properties, required, disabled, readonly, uiSchema, idSchema, schema, formData, onAddClick, registry, } = props;
    const uiOptions = (0, utils_1.getUiOptions)(uiSchema);
    const TitleFieldTemplate = (0, utils_1.getTemplate)('TitleFieldTemplate', registry, uiOptions);
    const DescriptionFieldTemplate = (0, utils_1.getTemplate)('DescriptionFieldTemplate', registry, uiOptions);
    const { ButtonTemplates: { AddButton }, } = registry.templates;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        title && (react_1.default.createElement(TitleFieldTemplate, { id: (0, utils_1.titleId)(idSchema), title: title, required: required, schema: schema, uiSchema: uiSchema, registry: registry })),
        description && (react_1.default.createElement(DescriptionFieldTemplate, { id: (0, utils_1.descriptionId)(idSchema), description: description, schema: schema, uiSchema: uiSchema, registry: registry })),
        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, style: { marginTop: '10px' } },
            properties.map((element, index) => {
                var _a;
                return element.hidden ? (element.content) : (react_1.default.createElement(Grid_1.default, { item: true, xs: ((_a = uiSchema[element.name]) === null || _a === void 0 ? void 0 : _a['ui:gridColumns']) || 12, key: index, style: { marginBottom: '10px' } }, element.content));
            }),
            (0, utils_1.canExpand)(schema, uiSchema, formData) && (react_1.default.createElement(Grid_1.default, { container: true, justifyContent: "flex-end" },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(AddButton, { className: "object-property-expand", onClick: onAddClick(schema), disabled: disabled || readonly, uiSchema: uiSchema, registry: registry })))))));
}
exports.default = ObjectFieldTemplate;
//# sourceMappingURL=ObjectFieldTemplate.js.map