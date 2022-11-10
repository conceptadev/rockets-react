"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.useAuth = void 0;
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const react_1 = __importStar(require("react"));
const AuthContext = (0, react_1.createContext)({});
const useAuth = () => (0, react_1.useContext)(AuthContext);
exports.useAuth = useAuth;
const authLogin = (loginData) => react_data_provider_1.default.post({
    uri: '/auth/login',
    body: loginData,
});
const AuthProvider = ({ children, }) => {
    const [user, setUser] = (0, react_1.useState)();
    const [isFetching, setIsFetching] = (0, react_1.useState)(false);
    const { execute } = (0, react_data_provider_1.useDataProvider)(authLogin, false, {
        onSuccess: (data) => {
            if (data) {
                localStorage.setItem('access_token', data['access_token']);
                setUser('USER');
            }
        },
        onError: (error) => {
            console.error({ error });
        },
        onFinish: () => {
            setIsFetching(false);
        },
    });
    const doLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
        setIsFetching(true);
        execute([loginData]);
    });
    const doLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        localStorage.removeItem('access_token');
    });
    return (react_1.default.createElement(AuthContext.Provider, { value: { user, doLogin, doLogout, isFetching } }, children));
};
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=index.js.map