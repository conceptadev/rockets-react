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
exports.OrderableDropDown = void 0;
const react_1 = __importStar(require("react"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const material_1 = require("@mui/material");
const core_1 = require("@dnd-kit/core");
const sortable_1 = require("@dnd-kit/sortable");
const utilities_1 = require("@dnd-kit/utilities");
const DragIndicator_1 = __importDefault(require("@mui/icons-material/DragIndicator"));
const SettingsSuggest_1 = __importDefault(require("@mui/icons-material/SettingsSuggest"));
const useSettingsStorage_1 = require("../../hooks/useSettingsStorage");
const SortableItem = (props) => {
    const { id, checked, label, labelId, indeterminate, isHeader = false, handleToggle, disabled = false, } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = (0, sortable_1.useSortable)({ id });
    const style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition,
    };
    return (react_1.default.createElement("div", Object.assign({ ref: setNodeRef, style: style }, attributes, { "data-testid": "orderable-item" }),
        react_1.default.createElement(ListItem_1.default, { sx: {
                borderBottom: isHeader ? '1px solid' : undefined,
                borderColor: (theme) => isHeader ? theme.palette.divider : undefined,
                paddingLeft: !isHeader ? undefined : 5,
            }, key: id, secondaryAction: react_1.default.createElement(material_1.Checkbox, { edge: "end", onChange: () => handleToggle(id), disabled: disabled, checked: checked, inputProps: { 'aria-labelledby': labelId }, indeterminate: indeterminate }), disablePadding: true },
            react_1.default.createElement(material_1.ListItemButton, { disabled: disabled, sx: {
                    pointerEvents: isHeader ? 'none' : undefined,
                    columnGap: 2,
                } },
                !isHeader && (react_1.default.createElement(material_1.ListItemAvatar, { sx: {
                        display: 'flex',
                        minWidth: 'auto',
                    } },
                    react_1.default.createElement(DragIndicator_1.default, Object.assign({}, listeners)))),
                react_1.default.createElement(material_1.ListItemText, { id: labelId, primary: label })))));
};
const OrderableDropDown = ({ list, setList, minimumItems = 0, hasAllOption = false, icon = react_1.default.createElement(SettingsSuggest_1.default, null), text, storage, }) => {
    const { updateSettings } = (0, useSettingsStorage_1.useSettingsStorage)({
        key: storage === null || storage === void 0 ? void 0 : storage.key,
        type: storage === null || storage === void 0 ? void 0 : storage.type,
        data: list.map((item) => ({
            id: item.id,
            label: item.label,
            hide: Boolean(item.hide),
        })),
        cacheApiPath: storage === null || storage === void 0 ? void 0 : storage.cacheApiPath,
        setListCallback: (callbackData) => storage === null || storage === void 0 ? void 0 : storage.onListUpdateFromCache(callbackData),
    });
    const sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.MouseSensor, {
        activationConstraint: {
            delay: 0,
            tolerance: 5,
        },
    }), (0, core_1.useSensor)(core_1.TouchSensor, {
        activationConstraint: {
            delay: 0,
            tolerance: 5,
        },
    }), (0, core_1.useSensor)(core_1.KeyboardSensor, {
        coordinateGetter: sortable_1.sortableKeyboardCoordinates,
    }));
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const [checked, setChecked] = (0, react_1.useState)(list.filter((listItem) => !listItem.hide).map((li) => li.id));
    const handleToggleAll = (value) => {
        if (value !== 'all')
            return;
        if (!checked.length) {
            setChecked(list.map((item) => item.id));
            setList((prevState) => {
                const newItems = prevState.map((item) => (Object.assign(Object.assign({}, item), { hide: false })));
                updateSettings(newItems);
                return newItems;
            });
            return;
        }
        if (checked.length === list.length) {
            setList((prevState) => {
                const newItems = prevState.map((item) => (Object.assign(Object.assign({}, item), { hide: true })));
                updateSettings(newItems);
                return newItems;
            });
            setChecked([]);
        }
        else {
            setChecked((prevState) => {
                const newState = [...prevState];
                list.forEach((item) => {
                    if (!prevState.includes(item.id)) {
                        newState.push(item.id);
                    }
                });
                return newState;
            });
            setList((prevState) => {
                const newItems = prevState.map((item) => (Object.assign(Object.assign({}, item), { hide: false })));
                updateSettings(newItems);
                return newItems;
            });
        }
    };
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(currentIndex, 1);
        }
        setList((prevState) => {
            const newItems = prevState.map((listItem) => {
                const isHidden = newChecked.includes(listItem.id) ? false : true;
                if (isHidden && listItem.resetFilters) {
                    listItem.resetFilters();
                }
                return Object.assign(Object.assign({}, listItem), { hide: isHidden });
            });
            updateSettings(newItems);
            return newItems;
        });
        setChecked(newChecked);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
            const oldIndex = list.findIndex((item) => item.id === active.id);
            const newIndex = list.findIndex((item) => item.id === (over === null || over === void 0 ? void 0 : over.id));
            const newItems = (0, sortable_1.arrayMove)(list, oldIndex, newIndex);
            updateSettings(newItems);
            setList(newItems);
        }
    };
    (0, react_1.useEffect)(() => {
        setChecked(list.filter((listItem) => !listItem.hide).map((li) => li.id));
    }, [list]);
    return (react_1.default.createElement(material_1.Box, null,
        text ? (react_1.default.createElement(material_1.Button, { onClick: (event) => {
                setAnchorEl(event.currentTarget);
            }, startIcon: icon, variant: "outlined", sx: {
                textTransform: 'capitalize',
                color: '#374151',
                borderColor: '#374151',
                textWrap: 'nowrap',
            } }, text)) : (react_1.default.createElement(material_1.IconButton, { onClick: (event) => {
                setAnchorEl(event.currentTarget);
            } }, icon)),
        react_1.default.createElement(material_1.Menu, { open: open, anchorEl: anchorEl, onClose: () => setAnchorEl(null) },
            react_1.default.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
                react_1.default.createElement(sortable_1.SortableContext, { items: list, strategy: sortable_1.verticalListSortingStrategy },
                    hasAllOption && (react_1.default.createElement(SortableItem, { id: "all", checked: list.length === checked.length, indeterminate: checked.length && list.length !== checked.length, label: "Select all", isHeader: true, handleToggle: handleToggleAll, labelId: "all" })), list === null || list === void 0 ? void 0 :
                    list.map((listItem) => {
                        if (!listItem.label)
                            return null;
                        const labelId = `checkbox-list-secondary-label-${listItem.id}`;
                        return (react_1.default.createElement(SortableItem, { disabled: minimumItems === list.filter((item) => !item.hide).length &&
                                !listItem.hide, key: listItem.id, id: listItem.id, checked: checked.indexOf(listItem.id) !== -1, label: listItem.label, handleToggle: handleToggle, labelId: labelId }));
                    }))))));
};
exports.OrderableDropDown = OrderableDropDown;
//# sourceMappingURL=OrderableDropDown.js.map