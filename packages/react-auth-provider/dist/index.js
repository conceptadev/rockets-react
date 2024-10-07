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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.useAuth = void 0;
const react_1 = require("react");
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const react_2 = __importStar(require("react"));
const AuthContext = (0, react_2.createContext)(null);
const useAuth = () => (0, react_2.useContext)(AuthContext);
exports.useAuth = useAuth;
const AuthProvider = ({ children, onSuccess, onError, }) => {
    const { post } = (0, react_data_provider_1.default)();
    const [user, setUser] = (0, react_2.useState)();
    const [accessToken, setAccessToken] = (0, react_2.useState)();
    const [refreshToken, setRefreshToken] = (0, react_2.useState)();
    (0, react_1.useEffect)(() => {
        const _accessToken = localStorage.getItem('accessToken');
        setAccessToken(_accessToken);
    }, []);
    const authLogin = (loginData) => {
        const { loginPath } = loginData, bodyData = __rest(loginData, ["loginPath"]);
        return post({
            uri: loginPath || '/auth/signin',
            body: bodyData,
        });
    };
    const { execute, isPending } = (0, react_data_provider_1.useQuery)(authLogin, false, {
        onSuccess: (data) => {
            if (data) {
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(data.accessToken);
            }
        },
        onError: (error) => {
            console.error({ error });
            onError === null || onError === void 0 ? void 0 : onError(error);
        },
    });
    const doLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
        execute(loginData);
    });
    const doLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        setAccessToken(undefined);
        setRefreshToken(undefined);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    });
    return (react_2.default.createElement(AuthContext.Provider, { value: {
            user,
            setUser,
            doLogin,
            doLogout,
            isPending,
            accessToken,
            refreshToken,
        } }, children));
};
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=index.js.map