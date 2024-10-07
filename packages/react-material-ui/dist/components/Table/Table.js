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
exports.Table = void 0;
const react_1 = __importDefault(require("react"));
const Styles_1 = require("./Styles");
const isMobile_1 = require("../../utils/isMobile");
const Table = (_a) => {
    var { children, variant = 'contained', sx } = _a, rest = __rest(_a, ["children", "variant", "sx"]);
    return (react_1.default.createElement(Styles_1.Table, Object.assign({ variant: variant }, rest, { sx: [
            {
                minWidth: isMobile_1.isMobile ? 'auto' : 750,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ], "data-testid": "mui-table" }), children));
};
exports.Table = Table;
//# sourceMappingURL=Table.js.map