'use client';
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
exports.SchemaForm = void 0;
const react_1 = __importDefault(require("react"));
const validator_ajv6_1 = __importDefault(require("@rjsf/validator-ajv6"));
const mui_1 = __importDefault(require("@rjsf/mui"));
const mapAdvancedProperties_1 = require("./utils/mapAdvancedProperties");
const mergeFormData_1 = require("./utils/mergeFormData");
const uiSchemaGenerator_1 = require("./utils/uiSchemaGenerator");
const CustomWidgets_1 = require("../../styles/CustomWidgets");
const Button_1 = __importDefault(require("./Button"));
const Title_1 = __importDefault(require("./Title"));
const CustomTemplates_1 = require("../../styles/CustomTemplates");
const Form = (_a) => {
    var { uiSchema, schema, formData, advancedProperties, children, advancedPropertiesMapper = mapAdvancedProperties_1.mapAdvancedProperties } = _a, props = __rest(_a, ["uiSchema", "schema", "formData", "advancedProperties", "children", "advancedPropertiesMapper"]);
    const finalSchema = Object.assign(Object.assign({}, schema), { properties: advancedPropertiesMapper(schema, advancedProperties) });
    const uiSchemaWithButtonTitle = Object.assign(Object.assign(Object.assign({}, (0, uiSchemaGenerator_1.uiSchemaGenerator)(finalSchema, advancedProperties)), uiSchema), { 'ui:submitButtonOptions': {
            submitText: props.buttonTitle,
        } });
    const templatesWithCustomButton = {
        ArrayFieldTemplate: CustomWidgets_1.ArrayFieldTemplate,
        ObjectFieldTemplate: CustomTemplates_1.ObjectFieldTemplate,
        ButtonTemplates: {
            SubmitButton: props.buttonComponent,
        },
    };
    if (!schema)
        return null;
    return (react_1.default.createElement(mui_1.default, Object.assign({ schema: finalSchema, uiSchema: props.buttonTitle
            ? uiSchemaWithButtonTitle
            : Object.assign(Object.assign({}, (0, uiSchemaGenerator_1.uiSchemaGenerator)(finalSchema, advancedProperties)), uiSchema), formData: (0, mergeFormData_1.mergeFormData)(finalSchema, formData), noHtml5Validate: true, showErrorList: false, templates: props.buttonComponent
            ? templatesWithCustomButton
            : {
                ArrayFieldTemplate: CustomWidgets_1.ArrayFieldTemplate,
                ObjectFieldTemplate: CustomTemplates_1.ObjectFieldTemplate,
            }, validator: validator_ajv6_1.default }, props), children));
};
exports.SchemaForm = { Form, Title: Title_1.default, Button: Button_1.default };
//# sourceMappingURL=SchemaForm.js.map