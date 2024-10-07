"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTERS = exports.CREATE_EDIT_FORM = exports.headers = void 0;
const CustomWidgets_1 = require("../../styles/CustomWidgets");
exports.headers = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'username',
        label: 'Username',
    },
    {
        id: 'email',
        label: 'Email',
    },
];
const schema = {
    type: 'object',
    required: ['email', 'username'],
    properties: {
        email: { type: 'string', title: 'Email', minLength: 3, format: 'email' },
        username: { type: 'string', title: 'Username', minLength: 3 },
    },
};
const uiSchema = {
    email: {
        'ui:widget': CustomWidgets_1.CustomTextFieldWidget,
    },
    username: {
        'ui:widget': CustomWidgets_1.CustomTextFieldWidget,
    },
};
exports.CREATE_EDIT_FORM = {
    formSchema: schema,
    formUiSchema: uiSchema,
};
exports.DEFAULT_FILTERS = [
    {
        id: 'id',
        label: 'ID',
        operator: 'eq',
        type: 'text',
        columns: 3,
    },
    {
        id: 'username',
        label: 'Username',
        operator: 'contL',
        type: 'text',
        columns: 3,
    },
    {
        id: 'email',
        label: 'Email',
        operator: 'contL',
        type: 'text',
        columns: 3,
    },
];
//# sourceMappingURL=constants.js.map