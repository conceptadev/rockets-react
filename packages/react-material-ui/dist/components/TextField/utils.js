"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordMatchInfo = exports.getPasswordScore = exports.validatePasswordScore = void 0;
const PasswordStrengthBar_1 = require("./PasswordStrengthBar");
const constants_1 = require("./constants");
const validatePasswordScore = (password, rules = constants_1.PASSWORD_DEFAULT_RULES, minValidationScore = constants_1.PASSWORD_DEFAULT_RULES.length) => {
    const score = (0, exports.getPasswordScore)(password, rules);
    return score >= minValidationScore;
};
exports.validatePasswordScore = validatePasswordScore;
const getPasswordScore = (password, rules) => {
    return rules.filter((rule) => { var _a; return (_a = password === null || password === void 0 ? void 0 : password.match) === null || _a === void 0 ? void 0 : _a.call(password, rule.pattern); }).length;
};
exports.getPasswordScore = getPasswordScore;
const getPasswordMatchInfo = (score, matchRules) => {
    const variants = Object.values(PasswordStrengthBar_1.PasswordStrengthBarVariants);
    if (score === 0)
        return [matchRules.text[0], variants[0]];
    const scoreIndex = matchRules.score.findIndex((item, index) => {
        var _a;
        return item >= score || score < ((_a = matchRules.score) === null || _a === void 0 ? void 0 : _a[index + 1]);
    });
    if (scoreIndex === matchRules.score.length) {
        return [
            matchRules.text[matchRules.text.length - 1],
            variants[matchRules.text.length - 1],
        ];
    }
    return [matchRules.text[scoreIndex], variants[scoreIndex]];
};
exports.getPasswordMatchInfo = getPasswordMatchInfo;
//# sourceMappingURL=utils.js.map