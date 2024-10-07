"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memoizee_1 = __importDefault(require("memoizee"));
const axiosClient_1 = __importDefault(require("./axiosClient"));
const ClientProvider_1 = require("./ClientProvider");
const maxAge = 10000;
const useDataProvider = () => {
    const { baseUrl, onRefreshTokenError } = (0, ClientProvider_1.useClient)();
    const client = axiosClient_1.default;
    const refreshAccessToken = (0, memoizee_1.default)(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = yield post({
                uri: '/token/refresh',
                body: {
                    refreshToken,
                },
            });
            if ((response === null || response === void 0 ? void 0 : response.accessToken) && (response === null || response === void 0 ? void 0 : response.refreshToken)) {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
            }
            return Promise.resolve(response);
        }
        catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            onRefreshTokenError === null || onRefreshTokenError === void 0 ? void 0 : onRefreshTokenError(error);
            return Promise.reject(error);
        }
    }), { maxAge });
    client.defaultConfig({
        baseURL: baseUrl,
        skipAuthUris: ['login', 'refresh'],
        headers: {
            'Content-Type': 'application/json',
        },
    });
    client.applyMiddleware({
        getAccessToken: () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                return accessToken;
            }
            else {
            }
        },
        getNewToken: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield refreshAccessToken();
        }),
    });
    const makeRequest = (requestParams) => {
        return client
            .executeRequest(requestParams)
            .then((res) => handleServerResponse(res))
            .catch((err) => handleServerError(err));
    };
    const handleServerResponse = (response) => {
        const { config, data, headers, status } = response;
        return data;
    };
    const handleServerError = (err) => {
        const { code, response, message } = err;
        throw err;
    };
    const post = (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        return makeRequest(Object.assign(Object.assign({}, requestParams), { method: 'POST' }));
    });
    const get = (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        return makeRequest(Object.assign(Object.assign({}, requestParams), { method: 'GET' }));
    });
    const put = (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        return makeRequest(Object.assign(Object.assign({}, requestParams), { method: 'PUT' }));
    });
    const patch = (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        return makeRequest(Object.assign(Object.assign({}, requestParams), { method: 'PATCH' }));
    });
    const del = (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        return makeRequest(Object.assign(Object.assign({}, requestParams), { method: 'DELETE' }));
    });
    return { post, get, put, patch, del };
};
exports.default = useDataProvider;
//# sourceMappingURL=useDataProvider.js.map