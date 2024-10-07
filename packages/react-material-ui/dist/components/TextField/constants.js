"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_DEFAULT_RULES = exports.PASSWORD_MATCH_RULES = exports.PASSWORD_MATCH_TEXT = exports.PASSWORD_MATCH_SCORE = exports.SPECIAL_CHARS_REGEX = exports.NUMBER_REGEX = exports.LOWERCASE_REGEX = exports.UPPERCASE_REGEX = exports.LENGTH_REGEX = void 0;
exports.LENGTH_REGEX = new RegExp(/.{8,}$/);
exports.UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
exports.LOWERCASE_REGEX = new RegExp(/.*[a-z]/);
exports.NUMBER_REGEX = new RegExp(/.*\d/);
exports.SPECIAL_CHARS_REGEX = new RegExp(/.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/);
exports.PASSWORD_MATCH_SCORE = [0, 2, 3, 5];
exports.PASSWORD_MATCH_TEXT = ['Very weak', 'Weak', 'Medium', 'Great'];
exports.PASSWORD_MATCH_RULES = {
    text: exports.PASSWORD_MATCH_TEXT,
    score: exports.PASSWORD_MATCH_SCORE,
};
exports.PASSWORD_DEFAULT_RULES = [
    {
        label: '8 characters',
        pattern: exports.LENGTH_REGEX,
    },
    {
        label: '1 Alpha Upper character',
        pattern: exports.UPPERCASE_REGEX,
    },
    {
        label: '1 Alpha Lower character',
        pattern: exports.LOWERCASE_REGEX,
    },
    {
        label: '1 Numeric character',
        pattern: exports.NUMBER_REGEX,
    },
    {
        label: '1 Special character (Example: "@", "#", "*")',
        pattern: exports.SPECIAL_CHARS_REGEX,
    },
];
//# sourceMappingURL=constants.js.map