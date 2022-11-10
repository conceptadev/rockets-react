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
const axiosClient_1 = __importDefault(require("./axiosClient"));
const apiUrl = 'http://localhost:3001';
const client = axiosClient_1.default;
client.defaultConfig({
    baseURL: apiUrl,
    skipAuthUris: ['login', 'refresh'],
    headers: {
        'Content-Type': 'application/json',
    },
});
client.applyMiddleware({
    getAccessToken: () => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            return accessToken;
        }
        else {
        }
    },
    getNewToken: () => {
    },
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
const DataProvider = {
    post: (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        return makeRequest(Object.assign(Object.assign({}, requestParams), { method: 'POST' }));
    }),
};
exports.default = DataProvider;
//# sourceMappingURL=dataProvider.js.map