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
exports.useQuery = exports.ClientProvider = void 0;
const react_1 = require("react");
const useDataProvider_1 = __importDefault(require("./useDataProvider"));
const ClientProvider_1 = __importDefault(require("./ClientProvider"));
exports.ClientProvider = ClientProvider_1.default;
const interfaces_1 = require("./interfaces");
const useQuery = (asyncFn, immediate = false, options, arg) => {
    const [status, setStatus] = (0, react_1.useState)(interfaces_1.AsyncStatus.idle);
    const [data, setData] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)();
    const [isPending, setIsPending] = (0, react_1.useState)(false);
    const { onError, onSuccess, onFinish, formatData } = options || {};
    const execute = (0, react_1.useCallback)((_arg) => __awaiter(void 0, void 0, void 0, function* () {
        setStatus(interfaces_1.AsyncStatus.pending);
        setIsPending(true);
        setError(undefined);
        try {
            const response = yield asyncFn(_arg);
            const formattedData = formatData ? formatData(response) : response;
            setData(formattedData);
            setStatus(interfaces_1.AsyncStatus.success);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(formattedData);
            onFinish === null || onFinish === void 0 ? void 0 : onFinish(interfaces_1.AsyncStatus.success);
        }
        catch (err) {
            setError(err);
            setStatus(interfaces_1.AsyncStatus.error);
            onError === null || onError === void 0 ? void 0 : onError(err);
            onFinish === null || onFinish === void 0 ? void 0 : onFinish(interfaces_1.AsyncStatus.error);
        }
        finally {
            setIsPending(false);
        }
    }), [asyncFn]);
    const refresh = (0, react_1.useCallback)(() => execute(arg), [execute]);
    (0, react_1.useEffect)(() => {
        if (immediate) {
            execute(arg);
        }
    }, [immediate]);
    return { execute, status, isPending, data, error, refresh };
};
exports.useQuery = useQuery;
exports.default = useDataProvider_1.default;
//# sourceMappingURL=index.js.map