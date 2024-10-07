"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAdvancedProperties = void 0;
const mapEnumToSchema_1 = require("./mapEnumToSchema");
const mapEnumToCheckbox_1 = require("./mapEnumToCheckbox");
const fieldTypesMap = {
    string: 'string',
    email: 'string',
    password: 'string',
    array: 'array',
    select: 'string',
    radio: 'string',
    checkbox: 'boolean',
    checkboxes: 'array',
    switch: 'boolean',
};
const mapAdvancedProperties = (_schema, _advancedProperties) => {
    if (!(_schema === null || _schema === void 0 ? void 0 : _schema.properties) || typeof (_schema === null || _schema === void 0 ? void 0 : _schema.properties) !== 'object')
        return;
    const schemaEntries = Object.entries(_schema === null || _schema === void 0 ? void 0 : _schema.properties);
    const overridenProperties = schemaEntries.map(([key, value]) => {
        if (typeof value === 'boolean')
            return [key, value];
        const advancedProperty = _advancedProperties === null || _advancedProperties === void 0 ? void 0 : _advancedProperties[key];
        const fieldType = advancedProperty && (fieldTypesMap === null || fieldTypesMap === void 0 ? void 0 : fieldTypesMap[advancedProperty === null || advancedProperty === void 0 ? void 0 : advancedProperty.type]);
        if (!advancedProperty || !fieldType)
            return [key, value];
        let parsedSchemaAdvancedProperty = {};
        if (advancedProperty.type === 'checkboxes') {
            parsedSchemaAdvancedProperty = Object.assign(Object.assign({}, value), { type: fieldType, uniqueItems: true, items: (0, mapEnumToCheckbox_1.mapEnumToCheckbox)(advancedProperty) });
        }
        if ((value === null || value === void 0 ? void 0 : value.enum) && ['select', 'radio'].includes(advancedProperty.type)) {
            parsedSchemaAdvancedProperty = Object.assign(Object.assign({}, value), { oneOf: (0, mapEnumToSchema_1.mapEnumToSchema)(fieldType, value.enum, advancedProperty) });
        }
        if (advancedProperty.type === 'array' && advancedProperty.properties) {
            parsedSchemaAdvancedProperty = Object.assign(Object.assign({}, value), { type: 'object', properties: (0, exports.mapAdvancedProperties)({ properties: advancedProperty.properties }, advancedProperty.advancedProperties) });
        }
        return [
            key,
            Object.keys(parsedSchemaAdvancedProperty).length > 0
                ? parsedSchemaAdvancedProperty
                : value,
        ];
    });
    return Object.fromEntries(overridenProperties);
};
exports.mapAdvancedProperties = mapAdvancedProperties;
//# sourceMappingURL=mapAdvancedProperties.js.map