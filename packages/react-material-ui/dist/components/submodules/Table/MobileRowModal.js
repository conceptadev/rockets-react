"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const get_1 = __importDefault(require("lodash/get"));
const material_1 = require("@mui/material");
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const Text_1 = __importDefault(require("../../Text"));
const useTableRoot_1 = require("../../Table/hooks/useTableRoot");
const getCellData = (row, dataOrigin) => {
    var _a, _b;
    const cell = (0, get_1.default)(row, dataOrigin);
    if (!cell)
        return '';
    if (typeof cell === 'number' ||
        typeof cell === 'string' ||
        typeof cell === 'undefined') {
        return (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 400, color: "text.primary" }, cell !== null && cell !== void 0 ? cell : ''));
    }
    if ('component' in cell) {
        return cell.component;
    }
    if ('title' in cell) {
        return (react_1.default.createElement(material_1.Tooltip, { title: cell.title },
            react_1.default.createElement("span", null, (_a = cell.value) !== null && _a !== void 0 ? _a : '')));
    }
    return (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 400, color: "text.primary" }, (_b = cell.value) !== null && _b !== void 0 ? _b : ''));
};
const MobileRowModal = ({ currentRow, onClose, titleSrc }) => {
    const { headers } = (0, useTableRoot_1.useTableRoot)();
    return (react_1.default.createElement(material_1.Dialog, { open: !!currentRow, fullWidth: true, onClose: onClose },
        react_1.default.createElement(material_1.Box, { display: "flex", justifyContent: "space-between" },
            titleSrc &&
                (currentRow === null || currentRow === void 0 ? void 0 : currentRow[titleSrc]) &&
                typeof currentRow[titleSrc] === 'string' && (react_1.default.createElement(material_1.Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                    width: '100%',
                    overflow: 'hidden',
                } },
                react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 400, color: "text.primary", sx: {
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    } }, currentRow[titleSrc]))),
            react_1.default.createElement(material_1.IconButton, { "aria-label": "close", onClick: onClose, sx: {
                    color: (theme) => theme.palette.grey[500],
                } },
                react_1.default.createElement(Close_1.default, null))),
        react_1.default.createElement(material_1.DialogContent, { sx: { display: 'block' } },
            react_1.default.createElement(material_1.Box, null, headers === null || headers === void 0 ? void 0 : headers.map((header) => {
                if (header.hide || !header.label)
                    return null;
                return (react_1.default.createElement(material_1.Box, { key: header.id, display: "flex", sx: { mb: 2, alignItems: 'center' } },
                    react_1.default.createElement(material_1.Box, { sx: {
                            display: 'block',
                            alignItems: 'center',
                            fontSize: 12,
                            width: 70,
                            minWidth: 70,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            paddingRight: '3px',
                            borderRight: '1px solid #ccc',
                            p: {
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                fontSize: 12,
                            },
                        } }, header.label),
                    react_1.default.createElement(material_1.Box, { sx: {
                            display: 'block',
                            alignItems: 'center',
                            fontSize: 12,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            paddingLeft: '6px',
                            '& p': {
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                fontSize: '12px !important',
                            },
                        } }, getCellData(currentRow, header.source || header.id))));
            })))));
};
exports.default = MobileRowModal;
//# sourceMappingURL=MobileRowModal.js.map