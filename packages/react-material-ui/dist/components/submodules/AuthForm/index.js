"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const validator_ajv6_1 = __importDefault(require("@rjsf/validator-ajv6"));
const material_1 = require("@mui/material");
const Text_1 = __importDefault(require("../../../components/Text"));
const Link_1 = require("../../../components/Link");
const SchemaForm_1 = require("../../../components/SchemaForm");
const Image_1 = require("../../../components/Image");
const CustomWidgets_1 = require("../../../styles/CustomWidgets");
const validation_1 = require("../../../utils/form/validation");
const constants_1 = require("./constants");
const react_auth_provider_1 = require("@concepta/react-auth-provider");
const widgets = {
    TextWidget: CustomWidgets_1.CustomTextFieldWidget,
};
const renderTitle = (title) => {
    if (typeof title === 'string') {
        return (react_1.default.createElement(Text_1.default, { variant: "h4", fontFamily: "Inter", fontSize: 30, fontWeight: 800, mt: 1, gutterBottom: true }, title));
    }
    return title;
};
const AuthFormSubmodule = (props) => {
    var _a, _b, _c, _d;
    const [formData, setFormData] = (0, react_2.useState)({});
    const searchParams = new URLSearchParams(window.location.search);
    const passcode = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get('token');
    const { post, patch, put } = (0, react_data_provider_1.default)();
    const { doLogin, isPending: isLoadingSignIn } = (0, react_auth_provider_1.useAuth)();
    const query = {
        post: post,
        patch: patch,
        put: put,
    }[((_a = props.query) === null || _a === void 0 ? void 0 : _a.method) || 'post'] || post;
    const { execute: performRequest, isPending: isLoadingRequest } = (0, react_data_provider_1.useQuery)((body) => {
        var _a;
        return query({
            uri: ((_a = props.query) === null || _a === void 0 ? void 0 : _a.uri) || '',
            body,
        });
    }, false, {
        onSuccess: (data) => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f;
            (_f = (_e = props.query) === null || _e === void 0 ? void 0 : _e.onSuccess) === null || _f === void 0 ? void 0 : _f.call(_e, data);
        }),
        onError: (error) => { var _a, _b; return (_b = (_a = props.query) === null || _a === void 0 ? void 0 : _a.onError) === null || _b === void 0 ? void 0 : _b.call(_a, error); },
    });
    const handleSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        const fields = values.formData || {};
        if (props.route === 'signIn') {
            const { username, password } = fields;
            const loginData = props.submitDataFormatter
                ? props.submitDataFormatter(fields)
                : { username, password, loginPath: props.signInRequestPath };
            doLogin(loginData);
            return;
        }
        if (props.route === 'resetPassword') {
            const fieldsWithPasscode = Object.assign(Object.assign({}, fields), { passcode });
            const resetPassData = props.submitDataFormatter
                ? props.submitDataFormatter(fieldsWithPasscode)
                : fieldsWithPasscode;
            yield performRequest(resetPassData);
            return;
        }
        performRequest(fields);
    });
    const isLoading = isLoadingSignIn || isLoadingRequest;
    const defaultRouteTitle = {
        signIn: 'Sign in',
        signUp: 'Sign up',
        forgotPassword: 'Recover password',
        resetPassword: 'Reset password',
    }[props.route];
    const defaultFormSchema = {
        signIn: constants_1.signInFormSchema,
        signUp: constants_1.signUpFormSchema,
        forgotPassword: constants_1.forgotPasswordFormSchema,
        resetPassword: constants_1.resetPasswordFormSchema,
    }[props.route] || {};
    return (react_1.default.createElement(material_1.Container, { sx: { textAlign: 'center', padding: '48px 0' } },
        !props.hideLogo && (react_1.default.createElement(Image_1.Image, { src: props.logoSrc || '/logo.svg', alt: "logo" })),
        props.headerComponent || null,
        react_1.default.createElement(material_1.Container, { maxWidth: "xs" },
            react_1.default.createElement(material_1.Card, { sx: { padding: '24px', marginTop: '32px' } },
                !props.hideTitle && renderTitle((_b = props.title) !== null && _b !== void 0 ? _b : defaultRouteTitle),
                react_1.default.createElement(SchemaForm_1.SchemaForm.Form, { schema: props.overrideDefaults && props.formSchema
                        ? props.formSchema
                        : Object.assign(Object.assign(Object.assign({}, defaultFormSchema), props.formSchema), { required: [
                                ...(defaultFormSchema.required || []),
                                ...(((_c = props.formSchema) === null || _c === void 0 ? void 0 : _c.required) || []),
                            ], properties: Object.assign(Object.assign({}, defaultFormSchema.properties), (_d = props.formSchema) === null || _d === void 0 ? void 0 : _d.properties) }), uiSchema: props.overrideDefaults && props.formUiSchema
                        ? props.formUiSchema
                        : Object.assign(Object.assign({}, constants_1.defaultAuthUiSchema), props.formUiSchema), validator: validator_ajv6_1.default, formData: props.formData || formData, onChange: ({ formData }) => setFormData(formData), onSubmit: handleSubmit, noHtml5Validate: true, showErrorList: false, advancedProperties: props.advancedProperties, customValidate: props.customValidation
                        ? (formData, errors) => (0, validation_1.validateForm)(formData, errors, props.customValidation)
                        : undefined, widgets: widgets },
                    props.forgotPasswordPath ? (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, gutterBottom: true, sx: { mt: 2 } },
                        react_1.default.createElement(Link_1.Link, { href: props.forgotPasswordPath, color: "primary.dark" }, "Forgot your password?"))) : null,
                    react_1.default.createElement(material_1.Box, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mt: 2 },
                        react_1.default.createElement(material_1.Button, { type: "submit", variant: "contained", disabled: Boolean(isLoading), sx: { flex: 1 } }, isLoading ? (react_1.default.createElement(material_1.CircularProgress, { sx: { color: 'white' }, size: 24 })) : (props.submitButtonTitle || 'Send')))),
                props.signInPath ? (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, gutterBottom: true, sx: { mt: 3 } },
                    react_1.default.createElement(Link_1.Link, { href: props.signInPath, color: "primary.dark" }, "Already have an account? Sign in"))) : null,
                props.signUpPath ? (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 500, gutterBottom: true, sx: { mt: 3 } },
                    react_1.default.createElement(Link_1.Link, { href: props.signUpPath, color: "primary.dark" }, "No account? Sign up"))) : null))));
};
exports.default = AuthFormSubmodule;
//# sourceMappingURL=index.js.map