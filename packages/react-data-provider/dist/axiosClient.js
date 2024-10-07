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
const axios_1 = __importDefault(require("axios"));
let axiosInstance;
let defaultConfigs;
const axiosClient = {
    executeRequest: (configs) => {
        if (!axiosInstance) {
            throw 'You need to create a http client instance with default config';
        }
        return axiosInstance
            .request(Object.assign(Object.assign(Object.assign({}, configs), { url: configs.uri, params: configs.queryParams, signal: configs.signal }), ('body' in configs && { data: configs.body })))
            .then((response) => {
            const { config, data, headers, status } = response;
            return {
                config,
                data,
                headers,
                status,
            };
        })
            .catch((error) => {
            throw {
                code: error.code,
                message: error.message,
                response: error.response,
            };
        });
    },
    applyMiddleware: (middlewares) => {
        if (!axiosInstance) {
            throw 'You need to create a http client instance with default config';
        }
        axiosInstance.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (config.url &&
                defaultConfigs.skipAuthUris.findIndex((uri) => { var _a; return (_a = config === null || config === void 0 ? void 0 : config.url) === null || _a === void 0 ? void 0 : _a.includes(uri); }) === -1) {
                const accessToken = (_a = middlewares === null || middlewares === void 0 ? void 0 : middlewares.getAccessToken) === null || _a === void 0 ? void 0 : _a.call(middlewares);
                if (config.headers) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return Promise.resolve(config);
            }
            return Promise.resolve(config);
        }), (error) => __awaiter(void 0, void 0, void 0, function* () { return Promise.reject(error); }));
        axiosInstance.interceptors.response.use((response) => response, (error) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const config = error === null || error === void 0 ? void 0 : error.config;
            if (config.url &&
                defaultConfigs.skipAuthUris.findIndex((uri) => { var _a; return (_a = config === null || config === void 0 ? void 0 : config.url) === null || _a === void 0 ? void 0 : _a.includes(uri); }) === -1) {
                if (((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.status) === 401 && !(config === null || config === void 0 ? void 0 : config._sent)) {
                    config._sent = true;
                    const response = yield middlewares.getNewToken();
                    if (response &&
                        'accessToken' in response &&
                        'refreshToken' in response) {
                        if (config.headers) {
                            config.headers.Authorization = `Bearer ${response.accessToken}`;
                        }
                        return axiosInstance(config);
                    }
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }));
    },
    defaultConfig: (defaultConfig) => {
        axiosInstance = axios_1.default.create(defaultConfig);
        defaultConfigs = defaultConfig;
    },
};
exports.default = axiosClient;
//# sourceMappingURL=axiosClient.js.map