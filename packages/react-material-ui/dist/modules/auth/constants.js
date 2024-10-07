"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordModuleProps = exports.forgotPasswordModuleProps = exports.signUpModuleProps = exports.signInModuleProps = void 0;
exports.signInModuleProps = {
    signInRequestPath: '/auth/login',
    forgotPasswordPath: '/forgot-password',
    signUpPath: '/sign-up',
    query: {
        uri: '',
        method: '',
    },
};
exports.signUpModuleProps = {
    signInPath: '/sign-in',
    query: {
        uri: '/user',
        method: 'post',
    },
};
exports.forgotPasswordModuleProps = {
    signInPath: '/sign-in',
    query: {
        uri: '/auth/recovery/password',
        method: 'post',
    },
};
exports.resetPasswordModuleProps = {
    signInPath: '/sign-in',
    query: {
        uri: '/auth/recovery/password',
        method: 'patch',
    },
};
//# sourceMappingURL=constants.js.map