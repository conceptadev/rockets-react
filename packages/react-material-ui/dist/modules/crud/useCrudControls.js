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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudControlsProvider = exports.useCrudControls = exports.CrudControls = exports.ControlsActionEnum = void 0;
const react_1 = __importStar(require("react"));
var ControlsActionEnum;
(function (ControlsActionEnum) {
    ControlsActionEnum["ASSIGN_REFRESH_TABLE"] = "ASSIGN_REFRESH_TABLE";
    ControlsActionEnum["ASSIGN_IS_FORM_VISIBLE"] = "ASSIGN_IS_FORM_VISIBLE";
    ControlsActionEnum["ASSIGN_SET_FORM_VISIBLE"] = "ASSIGN_SET_FORM_VISIBLE";
    ControlsActionEnum["ASSIGN_TABLE_DATA"] = "ASSIGN_TABLE_DATA";
})(ControlsActionEnum = exports.ControlsActionEnum || (exports.ControlsActionEnum = {}));
exports.CrudControls = (0, react_1.createContext)({});
const useCrudControls = () => (0, react_1.useContext)(exports.CrudControls);
exports.useCrudControls = useCrudControls;
const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ControlsActionEnum.ASSIGN_REFRESH_TABLE:
            return Object.assign(Object.assign({}, state), { refreshTable: payload });
        case ControlsActionEnum.ASSIGN_IS_FORM_VISIBLE:
            return Object.assign(Object.assign({}, state), { isFormVisible: payload });
        case ControlsActionEnum.ASSIGN_SET_FORM_VISIBLE:
            return Object.assign(Object.assign({}, state), { setFormVisible: payload });
        case ControlsActionEnum.ASSIGN_TABLE_DATA:
            return Object.assign(Object.assign({}, state), { tableData: payload });
        default:
            return state;
    }
};
const CrudControlsProvider = ({ children, }) => {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, {});
    return (react_1.default.createElement(exports.CrudControls.Provider, { value: {
            refreshTable: state.refreshTable,
            isFormVisible: state.isFormVisible,
            setFormVisible: state.setFormVisible,
            tableData: state.tableData,
            dispatch,
        } }, children));
};
exports.CrudControlsProvider = CrudControlsProvider;
//# sourceMappingURL=useCrudControls.js.map