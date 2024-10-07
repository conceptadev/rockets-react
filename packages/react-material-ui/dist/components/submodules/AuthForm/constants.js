"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordFormSchema = exports.forgotPasswordFormSchema = exports.signUpFormSchema = exports.signInFormSchema = exports.defaultAuthUiSchema = void 0;
const CustomWidgets_1 = require("../../../styles/CustomWidgets");
exports.defaultAuthUiSchema = {
    email: {
        'ui:widget': CustomWidgets_1.CustomTextFieldWidget,
    },
    username: {
        'ui:widget': CustomWidgets_1.CustomTextFieldWidget,
    },
    password: {
        'ui:widget': CustomWidgets_1.CustomPasswordFieldWidget,
    },
    newPassword: {
        'ui:widget': CustomWidgets_1.CustomPasswordFieldWidget,
    },
    confirmNewPassword: {
        'ui:widget': CustomWidgets_1.CustomPasswordFieldWidget,
    },
};
exports.signInFormSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: { type: 'string', title: 'Username', minLength: 3 },
        password: { type: 'string', title: 'Password' },
    },
};
exports.signUpFormSchema = {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
        email: {
            type: 'string',
            title: 'Email',
            minLength: 3,
            format: 'email',
        },
        username: { type: 'string', title: 'Username', minLength: 3 },
        password: { type: 'string', title: 'Password' },
    },
};
exports.forgotPasswordFormSchema = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            title: 'Email',
            minLength: 3,
            format: 'email',
        },
    },
};
exports.resetPasswordFormSchema = {
    type: 'object',
    required: ['newPassword', 'confirmNewPassword'],
    properties: {
        newPassword: {
            type: 'string',
            title: 'New password',
        },
        confirmNewPassword: {
            type: 'string',
            title: 'Re-enter your new password',
        },
    },
};
//# sourceMappingURL=constants.js.map