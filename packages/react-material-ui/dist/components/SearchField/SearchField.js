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
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const debounce_1 = __importDefault(require("lodash/debounce"));
const material_1 = require("@mui/material");
const Clear_1 = __importDefault(require("@mui/icons-material/Clear"));
const material_2 = require("@mui/material");
const SearchIcon = () => (react_1.default.createElement(Search_1.default, { sx: {
        color: 'grey.400',
    } }));
const MuiTextField = (0, material_2.styled)(material_1.TextField)({
    '& label': {
        paddingRight: '32px',
    },
    '& label.Mui-focused': {
        paddingRight: '0',
    },
});
const SearchField = (_a) => {
    var _b;
    var { searchIconPlacement = 'end', defaultValue = '', wait = 500, onDebouncedSearchChange, onClear, placeholder = 'Search', onChange } = _a, props = __rest(_a, ["searchIconPlacement", "defaultValue", "wait", "onDebouncedSearchChange", "onClear", "placeholder", "onChange"]);
    const firstRender = (0, react_1.useRef)(true);
    const [search, setSearch] = (0, react_1.useState)(defaultValue);
    const value = (_b = props.value) !== null && _b !== void 0 ? _b : search;
    const handleDebouncedSearch = onDebouncedSearchChange &&
        (0, react_1.useMemo)(() => (0, debounce_1.default)(onDebouncedSearchChange, wait), []);
    const handleChange = (event) => {
        setSearch(event.target.value);
        onChange === null || onChange === void 0 ? void 0 : onChange(event);
    };
    (0, react_1.useEffect)(() => {
        if (!firstRender.current) {
            handleDebouncedSearch === null || handleDebouncedSearch === void 0 ? void 0 : handleDebouncedSearch(value);
        }
        else {
            firstRender.current = false;
        }
    }, [value]);
    const handleClear = () => {
        if (onClear) {
            return onClear();
        }
        setSearch('');
        onChange === null || onChange === void 0 ? void 0 : onChange({ target: { value: '' } });
    };
    return (react_1.default.createElement(MuiTextField, Object.assign({ placeholder: placeholder, variant: "outlined", onChange: handleChange, value: search, InputProps: Object.assign(Object.assign({}, (searchIconPlacement === 'start' && {
            startAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                react_1.default.createElement(SearchIcon, null))),
        })), { endAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "end" },
                react_1.default.createElement(material_1.IconButton, { size: "small", sx: {
                        mr: 0.5,
                        visibility: value ? 'visible' : 'hidden',
                    }, "aria-label": "clear search", onClick: handleClear },
                    react_1.default.createElement(Clear_1.default, { fontSize: "small" })),
                searchIconPlacement === 'end' && react_1.default.createElement(SearchIcon, null))) }) }, props)));
};
exports.default = SearchField;
//# sourceMappingURL=SearchField.js.map