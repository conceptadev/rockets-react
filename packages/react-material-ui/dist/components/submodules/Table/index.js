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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const material_1 = require("@mui/material");
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const Add_1 = __importDefault(require("@mui/icons-material/Add"));
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const get_1 = __importDefault(require("lodash/get"));
const Table_1 = __importDefault(require("../../Table"));
const constants_1 = require("./constants");
const Filter_1 = __importDefault(require("../../submodules/Filter"));
const useCrudRoot_1 = require("../../../modules/crud/useCrudRoot");
const isMobile_1 = require("../../../utils/isMobile");
const MobileRowModal_1 = __importDefault(require("./MobileRowModal"));
const TableSubmodule = (props) => {
    var _a;
    const theme = (0, material_1.useTheme)();
    const { filters } = (0, useCrudRoot_1.useCrudRoot)();
    const [mobileCurrentRow, setMobileCurrentRow] = (0, react_1.useState)(null);
    const { del } = (0, react_data_provider_1.default)();
    const { execute: deleteItem } = (0, react_data_provider_1.useQuery)((id) => del({
        uri: `/${props.queryResource}/${id}`,
    }), false, {
        onSuccess: (data) => {
            if (props.refresh) {
                props.refresh();
            }
            if (props.onDeleteSuccess) {
                props.onDeleteSuccess(data);
            }
        },
        onError: props.onDeleteError,
    });
    const tableTheme = (0, constants_1.generateTableTheme)(theme, props.tableTheme);
    const noActions = props.hideEditButton && props.hideDeleteButton && props.hideDetailsButton;
    const tableHeaders = (0, react_2.useMemo)(() => {
        return [
            ...props.tableSchema,
            ...(!props.hideActionsColumn && !noActions
                ? [{ id: 'actions', label: '' }]
                : []),
        ];
    }, [props]);
    const tableRows = (0, react_2.useMemo)(() => {
        const data = props.data || [];
        return data.map((row, index) => {
            const rowData = row;
            const newData = Object.assign(Object.assign({}, rowData), { id: String(rowData.id) });
            tableHeaders.forEach((schemaItem) => {
                if (schemaItem.format) {
                    const formattedData = schemaItem.format(rowData);
                    if (['string', 'number'].includes(typeof formattedData)) {
                        newData[schemaItem.id] = schemaItem.format(rowData);
                        return;
                    }
                    newData[schemaItem.id] = {
                        component: schemaItem.format(rowData),
                    };
                    return;
                }
                if (schemaItem.renderTableCell) {
                    const cellData = (0, get_1.default)(row, schemaItem.source || schemaItem.id);
                    newData[schemaItem.id] = schemaItem.renderTableCell(cellData, rowData);
                    return;
                }
            });
            return Object.assign(Object.assign({}, newData), { actions: {
                    component: (react_1.default.createElement(material_1.Box, { display: "flex" },
                        !props.hideEditButton && (react_1.default.createElement(material_1.IconButton, { onClick: (e) => {
                                e.stopPropagation();
                                if (props.onAction) {
                                    props.onAction({ action: 'edit', row: rowData, index });
                                }
                            }, "data-testid": "edit-button" },
                            react_1.default.createElement(Edit_1.default, null))),
                        !props.hideDeleteButton && (react_1.default.createElement(material_1.IconButton, { onClick: (e) => {
                                e.stopPropagation();
                                deleteItem(rowData.id);
                            }, "data-testid": "delete-button" },
                            react_1.default.createElement(Delete_1.default, null))),
                        !props.hideDetailsButton && (react_1.default.createElement(material_1.IconButton, { onClick: (e) => {
                                e.stopPropagation();
                                if (props.onAction) {
                                    props.onAction({
                                        action: 'details',
                                        row: rowData,
                                        index,
                                    });
                                }
                            }, "data-testid": "details-button" },
                            react_1.default.createElement(ChevronRight_1.default, null))))),
                } });
        });
    }, [props, tableHeaders]);
    const closeModal = () => {
        setMobileCurrentRow(null);
    };
    return (react_1.default.createElement(material_1.Box, null,
        react_1.default.createElement(Table_1.default.Root, Object.assign({ rows: tableRows, headers: tableHeaders, total: props.total, pageCount: props.pageCount, sx: tableTheme.root, tableQueryState: props.tableQueryState, updateTableQueryState: props.setTableQueryState }, props.tableRootProps),
            react_1.default.createElement(material_1.Box, { sx: {
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    my: 4,
                } }, filters && (react_1.default.createElement(Filter_1.default, { orderableListCacheKey: props.filterCacheKey, cacheApiPath: props.cacheApiPath, complementaryActions: react_1.default.createElement(material_1.Box, { sx: { display: 'flex' } },
                    props.reordable !== false && (react_1.default.createElement(Table_1.default.ColumnOrderable, { hasAllOption: props.hasAllOption, orderableListCacheKey: props.tableCacheKey, cacheApiPath: props.cacheApiPath })),
                    react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center", justifyContent: "flex-end" },
                        props.additionalFilterRowContent,
                        !props.hideAddButton && (react_1.default.createElement(material_1.Button, { variant: "contained", onClick: props.onAddNew, startIcon: props.addButtonStartIcon || react_1.default.createElement(Add_1.default, null), endIcon: props.addButtonEndIcon, sx: {
                                textTransform: 'capitalize',
                                textWrap: 'nowrap',
                                marginLeft: 2,
                            } }, props.addButtonContent || 'Add new')))) }))),
            react_1.default.createElement(material_1.TableContainer, { sx: tableTheme.tableContainer },
                react_1.default.createElement(Table_1.default.Table, Object.assign({ stickyHeader: true, variant: "outlined", sx: tableTheme.table }, props.tableProps),
                    react_1.default.createElement(material_1.TableHead, null,
                        react_1.default.createElement(material_1.TableRow, { sx: tableTheme.tableHeaderRow },
                            props.hasCheckboxes && react_1.default.createElement(Table_1.default.HeaderCheckbox, null),
                            react_1.default.createElement(Table_1.default.HeaderCells, { renderCell: (cell) => (react_1.default.createElement(Table_1.default.HeaderCell, { key: cell.id, cell: cell, sx: tableTheme.tableHeaderCell })) }))),
                    react_1.default.createElement(material_1.TableBody, null,
                        Boolean(!props.isPending && !((_a = props.data) === null || _a === void 0 ? void 0 : _a.length)) && (react_1.default.createElement(material_1.TableRow, { sx: tableTheme.tableBodyRow },
                            react_1.default.createElement(material_1.TableCell, { colSpan: tableHeaders.length, sx: {
                                    textAlign: 'center',
                                } }, "No records found."))),
                        react_1.default.createElement(Table_1.default.BodyRows, { renderRow: (row, labelId) => (react_1.default.createElement(Table_1.default.BodyRow, Object.assign({ key: row.id, row: row, hasCheckboxes: props.hasCheckboxes, sx: tableTheme.tableBodyRow }, (isMobile_1.isMobile &&
                                props.allowModalPreview && {
                                onClick: () => setMobileCurrentRow(row),
                            })),
                                props.hasCheckboxes && (react_1.default.createElement(Table_1.default.BodyCheckboxes, { row: row, labelId: labelId })),
                                react_1.default.createElement(Table_1.default.BodyCell, { row: row, sx: tableTheme.tableBodyCell }))) })))),
            props.paginationStyle === 'numeric' ? (react_1.default.createElement(material_1.Box, { mt: 2 },
                react_1.default.createElement(Table_1.default.PaginationNumbers, null))) : (react_1.default.createElement(Table_1.default.Pagination, Object.assign({ variant: "outlined" }, (isMobile_1.isMobile && {
                labelRowsPerPage: 'per page:',
                sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    '& .MuiTablePagination-selectLabel': {
                        paddingLeft: '10px',
                    },
                    '& .MuiToolbar-root': {
                        padding: 0,
                    },
                    '& .MuiTablePagination-spacer': {
                        display: 'none',
                    },
                    '& .MuiTablePagination-input': {
                        marginRight: 0,
                        marginLeft: 0,
                    },
                    '& .MuiTablePagination-actions': {
                        marginLeft: '0 !important',
                    },
                },
            })))),
            props.allowModalPreview && isMobile_1.isMobile && (react_1.default.createElement(MobileRowModal_1.default, { currentRow: mobileCurrentRow, onClose: closeModal, titleSrc: props.mobileModalTitleSrc })))));
};
exports.default = TableSubmodule;
//# sourceMappingURL=index.js.map