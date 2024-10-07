"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEnumToSchema = void 0;
const mapEnumToSchema = (type, enumList, advancedProperty) => {
    return enumList.map((enumListItem) => {
        var _a;
        const option = (_a = advancedProperty === null || advancedProperty === void 0 ? void 0 : advancedProperty.options) === null || _a === void 0 ? void 0 : _a.find((option) => {
            if (typeof option === 'object') {
                return option.value === enumListItem;
            }
            else {
                return enumListItem === option;
            }
        });
        const title = typeof option === 'object'
            ? option.label
            : option
                ? option
                : typeof enumListItem === 'string'
                    ? enumListItem
                    : 'Invalid title';
        const value = typeof option === 'object' ? option.value : enumListItem;
        return { type, title, const: value };
    });
};
exports.mapEnumToSchema = mapEnumToSchema;
//# sourceMappingURL=mapEnumToSchema.js.map