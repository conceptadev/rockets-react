"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEnumToCheckbox = void 0;
const mapEnumToCheckbox = (advancedProperty) => {
    if (!advancedProperty.options)
        return;
    const isEnum = advancedProperty.options.every((option) => typeof option === 'string');
    return Object.assign({ type: 'string' }, (isEnum
        ? { enum: advancedProperty.options }
        : {
            enum: undefined,
            oneOf: advancedProperty.options.map((option) => typeof option === 'object' && {
                const: option.value,
                title: option.label,
            }),
        }));
};
exports.mapEnumToCheckbox = mapEnumToCheckbox;
//# sourceMappingURL=mapEnumToCheckbox.js.map