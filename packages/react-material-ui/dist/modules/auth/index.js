"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const react_1 = __importDefault(require("react"));
const AuthForm_1 = __importDefault(require("../../components/submodules/AuthForm"));
const constants_1 = require("./constants");
const AuthModule = (props) => {
    const defaultModuleProps = {
        signIn: constants_1.signInModuleProps,
        signUp: constants_1.signUpModuleProps,
        forgotPassword: constants_1.forgotPasswordModuleProps,
        resetPassword: constants_1.resetPasswordModuleProps,
    }[props.route];
    const authQuery = Object.assign(Object.assign({}, defaultModuleProps.query), props.query);
    return (react_1.default.createElement(AuthForm_1.default, Object.assign({}, props.formProps, defaultModuleProps, props, { query: authQuery })));
};
exports.AuthModule = AuthModule;
//# sourceMappingURL=index.js.map