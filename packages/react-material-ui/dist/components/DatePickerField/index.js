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
const debounce_1 = __importDefault(require("lodash/debounce"));
const x_date_pickers_1 = require("@mui/x-date-pickers");
const DatePickerField = (_a) => {
    var { defaultValue, wait = 500, onDebouncedSearchChange } = _a, props = __rest(_a, ["defaultValue", "wait", "onDebouncedSearchChange"]);
    const firstRender = (0, react_1.useRef)(true);
    const [search, setSearch] = (0, react_1.useState)(null);
    const handleDebouncedSearch = (0, react_1.useMemo)(() => (0, debounce_1.default)(onDebouncedSearchChange, wait), [wait, props === null || props === void 0 ? void 0 : props.value]);
    const handleChange = (value) => setSearch(value);
    (0, react_1.useEffect)(() => {
        var _a;
        if (!firstRender.current) {
            handleDebouncedSearch((_a = props === null || props === void 0 ? void 0 : props.value) !== null && _a !== void 0 ? _a : search);
        }
        else {
            firstRender.current = false;
        }
    }, [search, props.value]);
    return (react_1.default.createElement(x_date_pickers_1.DatePicker, Object.assign({ defaultValue: defaultValue, value: search, onChange: handleChange, format: "MM-dd-yyyy", slotProps: {
            field: {
                clearable: true,
                onClear: () => {
                    handleDebouncedSearch(null);
                },
            },
            textField: {
                size: 'small',
            },
        } }, props)));
};
exports.default = DatePickerField;
//# sourceMappingURL=index.js.map