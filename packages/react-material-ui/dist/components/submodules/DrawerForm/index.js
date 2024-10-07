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
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const SchemaForm_1 = require("../../../components/SchemaForm");
const CustomWidgets_1 = require("../../../styles/CustomWidgets");
const TableRowControls_1 = __importDefault(require("../TableRowControls"));
const DrawerFormSubmodule = (props) => {
    const { queryResource, viewMode, widgets, formSchema, formUiSchema, formData, customValidate, submitButtonTitle, onClose, cancelButtonTitle, children, submitDataFormatter, onSuccess, onError, onDeleteSuccess, onDeleteError, onPrevious, onNext, isLoading, isVisible, sx, tableRowsProps } = props, otherProps = __rest(props, ["queryResource", "viewMode", "widgets", "formSchema", "formUiSchema", "formData", "customValidate", "submitButtonTitle", "onClose", "cancelButtonTitle", "children", "submitDataFormatter", "onSuccess", "onError", "onDeleteSuccess", "onDeleteError", "onPrevious", "onNext", "isLoading", "isVisible", "sx", "tableRowsProps"]);
    const { viewIndex, rowsPerPage, currentPage, pageCount } = tableRowsProps;
    const [fieldValues, setFieldValues] = (0, react_1.useState)(formData);
    (0, react_1.useEffect)(() => {
        setFieldValues(formData);
    }, [formData]);
    const { post, patch, del } = (0, react_data_provider_1.default)();
    const { execute: createItem, isPending: isLoadingCreation } = (0, react_data_provider_1.useQuery)((data) => post({
        uri: `/${queryResource}`,
        body: submitDataFormatter ? submitDataFormatter(data) : data,
    }), false, {
        onSuccess: onSuccess,
        onError: onError,
    });
    const { execute: editItem, isPending: isLoadingEdit } = (0, react_data_provider_1.useQuery)((data) => patch({
        uri: `/${queryResource}/${data.id}`,
        body: submitDataFormatter ? submitDataFormatter(data) : data,
    }), false, {
        onSuccess: onSuccess,
        onError: onError,
    });
    const { execute: deleteItem, isPending: isLoadingDelete } = (0, react_data_provider_1.useQuery)((data) => del({
        uri: `/${queryResource}/${data.id}`,
    }), false, {
        onSuccess: onDeleteSuccess,
        onError: onDeleteError,
    });
    const handleFieldChange = (values) => __awaiter(void 0, void 0, void 0, function* () {
        setFieldValues(values.formData);
    });
    const handleFormSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (viewMode === 'creation') {
            yield createItem(fieldValues);
        }
        if (viewMode === 'edit') {
            yield editItem(fieldValues);
        }
    });
    const _widgets = Object.assign({ TextWidget: CustomWidgets_1.CustomTextFieldWidget }, widgets);
    const title = () => {
        if (formSchema === null || formSchema === void 0 ? void 0 : formSchema.title) {
            return formSchema.title;
        }
        if (viewMode === 'creation') {
            return 'Add Data';
        }
        if (viewMode === 'edit') {
            return 'Edit Data';
        }
        return 'View Data';
    };
    const actionButtons = (0, react_1.useMemo)(() => {
        return (react_1.default.createElement(material_1.Box, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: viewMode === 'creation' ? 'flex-end' : 'space-between', id: "Rockets-FormDrawerFooter", mt: "auto" },
            viewMode !== 'creation' && (react_1.default.createElement(TableRowControls_1.default, Object.assign({}, tableRowsProps, { isLoading: isLoading, onPrevious: onPrevious, onNext: onNext }))),
            react_1.default.createElement(material_1.Box, { display: "flex", flexDirection: "row", alignItems: "center", gap: 2 },
                props.customFooterContent &&
                    (typeof props.customFooterContent === 'function'
                        ? props.customFooterContent(formData)
                        : props.customFooterContent),
                (viewMode === 'creation' || viewMode === 'edit') &&
                    !props.hideCancelButton && (react_1.default.createElement(material_1.Button, { variant: "outlined", onClick: onClose, sx: { flex: 1 } }, cancelButtonTitle || 'Cancel')),
                viewMode === 'edit' && props.isDeleteButtonVisible && (react_1.default.createElement(material_1.Button, { variant: "contained", color: "error", onClick: () => deleteItem(formData), sx: { flex: 1 } }, isLoadingDelete ? (react_1.default.createElement(material_1.CircularProgress, { sx: { color: 'white' }, size: 24 })) : (cancelButtonTitle || 'Delete'))),
                viewMode === 'details' && !props.hideCancelButton && (react_1.default.createElement(material_1.Button, { variant: "outlined", onClick: onClose, sx: { flex: 1 } }, cancelButtonTitle || 'Close')),
                viewMode !== 'details' && (react_1.default.createElement(material_1.Button, { type: "submit", variant: "contained", disabled: isLoadingCreation || isLoadingEdit || isLoadingDelete, sx: { flex: 1 } }, isLoadingCreation || isLoadingEdit ? (react_1.default.createElement(material_1.CircularProgress, { sx: { color: 'white' }, size: 24 })) : (submitButtonTitle || 'Save'))))));
    }, [
        isLoading,
        viewIndex,
        rowsPerPage,
        currentPage,
        pageCount,
        props.customFooterContent,
        viewMode,
        props.hideCancelButton,
        formData,
        isLoadingDelete,
        cancelButtonTitle,
        isLoadingCreation,
        isLoadingEdit,
        submitButtonTitle,
    ]);
    return (react_1.default.createElement(material_1.Drawer, { open: isVisible, anchor: "right", sx: sx, id: "Rockets-FormDrawer", className: "Rockets-FormDrawer" },
        react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mt: 2, ml: 1, className: "Rockets-FormDrawer-Title" },
            react_1.default.createElement(material_1.Typography, { variant: "h5", sx: { marginLeft: 3, fontSize: '20px' } }, title()),
            react_1.default.createElement(material_1.IconButton, { "aria-label": "close", onClick: onClose, sx: {
                    position: 'absolute',
                    right: (theme) => theme.spacing(1),
                    top: (theme) => theme.spacing(1),
                    color: (theme) => theme.palette.grey[500],
                } },
                react_1.default.createElement(Close_1.default, null))),
        react_1.default.createElement(material_1.Box, { padding: 4, sx: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '& .rjsf': {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                },
            }, className: "Rockets-FormDrawer-SchemaWrapper" }, isLoading ? (react_1.default.createElement(material_1.Box, { sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 10,
            } },
            react_1.default.createElement(material_1.CircularProgress, null))) : (react_1.default.createElement(SchemaForm_1.SchemaForm.Form, Object.assign({ schema: Object.assign(Object.assign({}, formSchema), { required: (formSchema === null || formSchema === void 0 ? void 0 : formSchema.required) || [], properties: (formSchema === null || formSchema === void 0 ? void 0 : formSchema.properties) || {}, title: '' }), uiSchema: Object.assign(Object.assign({}, formUiSchema), { 'ui:submitButtonOptions': { norender: true } }), noHtml5Validate: true, showErrorList: false, formData: fieldValues, widgets: _widgets, customValidate: customValidate, readonly: viewMode === 'details', onChange: handleFieldChange, onSubmit: handleFormSubmit }, otherProps),
            children,
            actionButtons)))));
};
exports.default = DrawerFormSubmodule;
//# sourceMappingURL=index.js.map