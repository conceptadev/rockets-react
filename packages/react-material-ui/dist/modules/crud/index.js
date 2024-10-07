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
exports.CrudContext = exports.useCrudRoot = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const material_1 = require("@mui/material");
const useTable_1 = __importDefault(require("../../components/Table/useTable"));
const Text_1 = __importDefault(require("../../components/Text"));
const Table_1 = __importDefault(require("../../components/submodules/Table"));
const DrawerForm_1 = __importDefault(require("../../components/submodules/DrawerForm"));
const ModalForm_1 = __importDefault(require("../../components/submodules/ModalForm"));
const CrudRoot_1 = __importDefault(require("./CrudRoot"));
const Breadcrumbs_1 = __importDefault(require("../../components/Breadcrumbs/Breadcrumbs"));
const useCrudRoot_1 = require("./useCrudRoot");
Object.defineProperty(exports, "useCrudRoot", { enumerable: true, get: function () { return useCrudRoot_1.useCrudRoot; } });
Object.defineProperty(exports, "CrudContext", { enumerable: true, get: function () { return useCrudRoot_1.CrudContext; } });
const useCrudControls_1 = require("./useCrudControls");
const CrudModule = (props) => {
    var _a;
    const [drawerViewMode, setDrawerViewMode] = (0, react_2.useState)(null);
    const [selectedRow, setSelectedRow] = (0, react_2.useState)(null);
    const [currentViewIndex, setCurrentViewIndex] = (0, react_2.useState)(0);
    const [isFormVisible, setFormVisible] = (0, react_2.useState)(false);
    const useTableReturn = (0, useTable_1.default)(props.resource, {
        callbacks: {
            onError: props.onFetchError,
        },
        navigate: props.navigate,
        order: props.tableProps.order,
        orderBy: props.tableProps.orderBy,
    });
    const { data, tableQueryState, setTableQueryState, pageCount, isPending, refresh, } = useTableReturn;
    const { refreshTable, dispatch } = (0, useCrudControls_1.useCrudControls)();
    (0, react_2.useEffect)(() => {
        if (!refreshTable && refresh && dispatch) {
            dispatch({
                type: useCrudControls_1.ControlsActionEnum.ASSIGN_REFRESH_TABLE,
                payload: refresh,
            });
        }
    }, [refresh]);
    (0, react_2.useEffect)(() => {
        if (dispatch) {
            dispatch({ type: useCrudControls_1.ControlsActionEnum.ASSIGN_TABLE_DATA, payload: data });
        }
    }, [data]);
    (0, react_2.useEffect)(() => {
        if (dispatch) {
            dispatch({
                type: useCrudControls_1.ControlsActionEnum.ASSIGN_IS_FORM_VISIBLE,
                payload: isFormVisible,
            });
            dispatch({
                type: useCrudControls_1.ControlsActionEnum.ASSIGN_SET_FORM_VISIBLE,
                payload: setFormVisible,
            });
        }
    }, [isFormVisible]);
    const changeCurrentFormData = (direction) => {
        const isPrevious = direction === 'previous';
        const isNext = direction === 'next';
        const isFirstItem = currentViewIndex === 0;
        const isLastItem = currentViewIndex === data.length - 1;
        if ((isPrevious && isFirstItem && tableQueryState.page === 1) ||
            (isNext && isLastItem && tableQueryState.page === pageCount)) {
            return;
        }
        if (direction === 'previous') {
            if (isFirstItem && tableQueryState.page > 1) {
                setTableQueryState(Object.assign(Object.assign({}, tableQueryState), { page: tableQueryState.page - 1 }));
            }
            setCurrentViewIndex(isFirstItem ? data.length - 1 : currentViewIndex - 1);
        }
        if (direction === 'next') {
            if (isLastItem && tableQueryState.page < pageCount) {
                setTableQueryState(Object.assign(Object.assign({}, tableQueryState), { page: tableQueryState.page + 1 }));
            }
            setCurrentViewIndex(isLastItem ? 0 : currentViewIndex + 1);
        }
    };
    const FormComponent = (0, react_2.useMemo)(() => {
        switch (props.formContainerVariation) {
            case 'drawer':
                return DrawerForm_1.default;
            case 'modal':
                return ModalForm_1.default;
            default:
                return DrawerForm_1.default;
        }
    }, [props.formContainerVariation]);
    const formProps = (0, react_2.useMemo)(() => {
        switch (drawerViewMode) {
            case 'creation':
                return props.createFormProps;
            case 'edit':
                return props.editFormProps;
            case 'details':
                return props.detailsFormProps;
            default:
                return props.createFormProps;
        }
    }, [
        drawerViewMode,
        props.createFormProps,
        props.detailsFormProps,
        props.editFormProps,
    ]);
    (0, react_2.useEffect)(() => {
        if (!data || !data.length) {
            return;
        }
        setSelectedRow(data[currentViewIndex]);
    }, [useTableReturn.data, currentViewIndex]);
    const formOnSuccess = formProps === null || formProps === void 0 ? void 0 : formProps.onSuccess;
    const formOnDeleteSuccess = formProps === null || formProps === void 0 ? void 0 : formProps.onDeleteSuccess;
    const enhancedFormProps = Object.assign({}, formProps);
    delete enhancedFormProps.onSuccess;
    delete enhancedFormProps.onDeleteSuccess;
    const _b = props.tableProps, { customFilter, customSearch, filters } = _b, tableSubmoduleProps = __rest(_b, ["customFilter", "customSearch", "filters"]);
    const titleName = typeof props.title === 'string' ? props.title : (_a = props.title) === null || _a === void 0 ? void 0 : _a.name;
    return (react_1.default.createElement(CrudRoot_1.default, { filters: filters, customFilter: customFilter, customSearch: customSearch, search: useTableReturn.search, updateSearch: useTableReturn.updateSearch, simpleFilter: useTableReturn.simpleFilter, updateSimpleFilter: useTableReturn.updateSimpleFilter, filterCallback: props.filterCallback, externalSearch: props.externalSearch, navigate: props.navigate },
        react_1.default.createElement(material_1.Box, null,
            !props.hideBreadcrumb && (react_1.default.createElement(material_1.Box, { mt: 4 },
                react_1.default.createElement(Breadcrumbs_1.default, { routes: [
                        { href: '/', label: 'Home' },
                        {
                            href: '#',
                            label: titleName || 'Table',
                        },
                    ] }))),
            typeof props.title === 'string' ? (react_1.default.createElement(Text_1.default, { fontFamily: "Inter", fontSize: 20, fontWeight: 800, mt: 4, mb: 4 }, props.title)) : null,
            !!props.title && typeof props.title != 'string'
                ? props.title.component
                : null,
            react_1.default.createElement(Table_1.default, Object.assign({ queryResource: props.resource, onAction: (payload) => {
                    setSelectedRow(payload.row);
                    setDrawerViewMode(payload.action);
                    setCurrentViewIndex(payload.index);
                    setFormVisible(true);
                }, onAddNew: () => {
                    setSelectedRow(null);
                    setDrawerViewMode('creation');
                    setFormVisible(true);
                }, hideAddButton: !props.createFormProps, hideEditButton: !props.editFormProps || props.hideEditButton, hideDeleteButton: props.hideDeleteButton, hideDetailsButton: !props.detailsFormProps || props.hideDetailsButton, filterCallback: props.filterCallback, externalSearch: props.externalSearch, filterCacheKey: props.filterCacheKey, tableCacheKey: props.tableCacheKey, cacheApiPath: props.cacheApiPath, hasCheckboxes: props.enableTableRowSelection, addButtonStartIcon: props.addButtonStartIcon, addButtonEndIcon: props.addButtonEndIcon, addButtonContent: props.addButtonContent, additionalFilterRowContent: props.additionalFilterRowContent }, useTableReturn, tableSubmoduleProps)),
            enhancedFormProps && isFormVisible && (react_1.default.createElement(FormComponent, Object.assign({ isVisible: isFormVisible, queryResource: props.resource, viewMode: drawerViewMode, formData: (formProps === null || formProps === void 0 ? void 0 : formProps.prepareDataForForm)
                    ? formProps.prepareDataForForm(selectedRow)
                    : selectedRow, onSuccess: (data) => {
                    setSelectedRow(null);
                    useTableReturn.refresh();
                    setFormVisible(false);
                    if (formOnSuccess) {
                        formOnSuccess(data);
                    }
                }, onDeleteSuccess: (data) => {
                    useTableReturn.refresh();
                    setFormVisible(false);
                    if (formOnDeleteSuccess) {
                        formOnDeleteSuccess(data);
                    }
                }, onClose: () => setFormVisible(false), onPrevious: () => changeCurrentFormData('previous'), onNext: () => changeCurrentFormData('next'), isLoading: isPending, tableRowsProps: {
                    currentIndex: (tableQueryState.page - 1) * tableQueryState.rowsPerPage +
                        currentViewIndex +
                        1,
                    viewIndex: currentViewIndex + 1,
                    rowsPerPage: tableQueryState.rowsPerPage,
                    currentPage: tableQueryState.page,
                    pageCount: useTableReturn.pageCount,
                    total: useTableReturn.total,
                } }, enhancedFormProps), enhancedFormProps.children)))));
};
exports.default = CrudModule;
//# sourceMappingURL=index.js.map