"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const crud_1 = __importDefault(require("../crud"));
const constants_1 = require("./constants");
const UsersModule = (_a) => {
    var { onEditError, onEditSuccess, onCreateSuccess, onCreateError, onDeleteSuccess, onDeleteError } = _a, props = __rest(_a, ["onEditError", "onEditSuccess", "onCreateSuccess", "onCreateError", "onDeleteSuccess", "onDeleteError"]);
    const tableProps = Object.assign({ tableSchema: constants_1.headers, reordable: true, filters: constants_1.DEFAULT_FILTERS }, props.tableProps);
    const createFormProps = Object.assign(Object.assign(Object.assign({}, constants_1.CREATE_EDIT_FORM), { onSuccess: onCreateSuccess, onError: onCreateError }), props.createFormProps);
    const editFormProps = Object.assign(Object.assign(Object.assign({}, constants_1.CREATE_EDIT_FORM), { onError: onEditError, onSuccess: onEditSuccess, onDeleteSuccess: onDeleteSuccess, onDeleteError: onDeleteError }), props.editFormProps);
    const detailsFormProps = Object.assign(Object.assign({}, constants_1.CREATE_EDIT_FORM), props.detailsFormProps);
    const enhancedProps = Object.assign({}, props);
    delete enhancedProps.tableProps;
    delete enhancedProps.createFormProps;
    delete enhancedProps.editFormProps;
    delete enhancedProps.detailsFormProps;
    return (react_1.default.createElement(crud_1.default, Object.assign({ title: "Users", resource: "user", hideDeleteButton: true, tableProps: tableProps, createFormProps: createFormProps, editFormProps: editFormProps, detailsFormProps: detailsFormProps }, enhancedProps)));
};
exports.default = UsersModule;
//# sourceMappingURL=index.js.map