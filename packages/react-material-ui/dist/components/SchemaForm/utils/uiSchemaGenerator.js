"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiSchemaGenerator = void 0;
const mapWidgetType_1 = require("./mapWidgetType");
const uiSchemaGenerator = (schema, advancedProperties) => {
    let uiSchema = {};
    if (!(schema === null || schema === void 0 ? void 0 : schema.properties) || typeof schema.properties !== 'object')
        return uiSchema;
    Object.keys(schema === null || schema === void 0 ? void 0 : schema.properties).forEach((key) => {
        const widgetType = (0, mapWidgetType_1.mapWidgetType)(key, schema, advancedProperties);
        if (widgetType) {
            uiSchema = Object.assign(Object.assign({}, uiSchema), { [key]: { 'ui:widget': widgetType } });
        }
    });
    return uiSchema;
};
exports.uiSchemaGenerator = uiSchemaGenerator;
//# sourceMappingURL=uiSchemaGenerator.js.map