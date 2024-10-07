"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeFormData = void 0;
const mergeFormData = (schema, formData) => {
    if ((schema === null || schema === void 0 ? void 0 : schema.properties) && typeof schema.properties === 'object') {
        const mergedFormData = Object.assign({}, formData);
        Object.keys(schema === null || schema === void 0 ? void 0 : schema.properties).map((key) => {
            const property = (schema === null || schema === void 0 ? void 0 : schema.properties) && schema.properties[key];
            if (property &&
                property !== true &&
                property.type !== undefined &&
                !Array.isArray(property.type) &&
                ['array'].includes(property.type)) {
                mergedFormData[key] = (mergedFormData === null || mergedFormData === void 0 ? void 0 : mergedFormData[key]) || [''];
            }
        });
        if (Object.keys(mergedFormData).length) {
            return mergedFormData;
        }
    }
    return null;
};
exports.mergeFormData = mergeFormData;
//# sourceMappingURL=mergeFormData.js.map