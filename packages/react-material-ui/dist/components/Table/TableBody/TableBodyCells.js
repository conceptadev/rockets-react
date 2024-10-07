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
exports.TableBodyCells = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../Text"));
const material_1 = require("@mui/material");
const get_1 = __importDefault(require("lodash/get"));
const useTableRoot_1 = require("../hooks/useTableRoot");
const isMobile_1 = require("../../../utils/isMobile");
const renderTextCell = (value) => (react_1.default.createElement(Text_1.default, { fontSize: 14, fontWeight: 400, color: "text.primary" }, value !== null && value !== void 0 ? value : ''));
const renderCell = (row, dataOrigin) => {
    var _a, _b;
    const cell = (0, get_1.default)(row, dataOrigin);
    if (!cell)
        return null;
    if (typeof cell === 'object') {
        if ('component' in cell) {
            return cell.component;
        }
        if (cell.title) {
            return (react_1.default.createElement(material_1.Tooltip, { title: cell.title },
                react_1.default.createElement("span", null, (_a = cell.value) !== null && _a !== void 0 ? _a : '')));
        }
        return renderTextCell((_b = cell.value) !== null && _b !== void 0 ? _b : '');
    }
    return renderTextCell(cell);
};
const TableBodyCells = (_a) => {
    var { row } = _a, rest = __rest(_a, ["row"]);
    const { headers } = (0, useTableRoot_1.useTableRoot)();
    return (react_1.default.createElement(react_1.default.Fragment, null, headers.map((header) => {
        if (header.hide)
            return null;
        if (isMobile_1.isMobile && header.hideOnMobile)
            return null;
        return (react_1.default.createElement(material_1.TableCell, Object.assign({ key: header.id }, rest), renderCell(row, header.source || header.id)));
    })));
};
exports.TableBodyCells = TableBodyCells;
//# sourceMappingURL=TableBodyCells.js.map