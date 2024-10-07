"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = void 0;
const lodash_1 = require("lodash");
const validateForm = (formData, errors, validationRules) => {
    const errorsAdded = {};
    for (const rule of validationRules) {
        const { field, test, message } = rule;
        const value = (0, lodash_1.get)(formData, field);
        if (test(value, formData)) {
            const fieldErrorsAdded = (0, lodash_1.get)(errorsAdded, field);
            if (!fieldErrorsAdded) {
                const errorField = (0, lodash_1.get)(errors, field);
                errorField === null || errorField === void 0 ? void 0 : errorField.addError(message);
                (0, lodash_1.set)(errorsAdded, field, true);
            }
        }
    }
    return errors;
};
exports.validateForm = validateForm;
//# sourceMappingURL=validation.js.map