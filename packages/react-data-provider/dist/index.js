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
exports.useDataProvider = void 0;
const react_1 = require("react");
const dataProvider_1 = __importDefault(require("./dataProvider"));
const interfaces_1 = require("./interfaces");
const useDataProvider = (asyncFn, immediate = false, callbacks, args) => {
    const [status, setStatus] = (0, react_1.useState)(interfaces_1.AsyncStatus.idle);
    const [data, setData] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)();
    const [isPending, setIsPending] = (0, react_1.useState)(false);
    const { onError, onSuccess, onFinish } = callbacks;
    const execute = (0, react_1.useCallback)((args) => __awaiter(void 0, void 0, void 0, function* () {
        console.log({ args });
        setStatus(interfaces_1.AsyncStatus.pending);
        setIsPending(true);
        setError(undefined);
        try {
            const response = yield asyncFn(args);
            setData(response);
            setStatus(interfaces_1.AsyncStatus.success);
            if (onSuccess) {
                onSuccess(response);
            }
            if (onFinish) {
                onFinish(interfaces_1.AsyncStatus.success);
            }
        }
        catch (err) {
            setError(err);
            setStatus(interfaces_1.AsyncStatus.error);
            if (onError) {
                onError(err);
            }
            if (onFinish) {
                onFinish(interfaces_1.AsyncStatus.error);
            }
        }
        finally {
            setIsPending(false);
        }
    }), [asyncFn]);
    const refresh = (0, react_1.useCallback)(() => execute(args), [execute]);
    (0, react_1.useEffect)(() => {
        if (immediate) {
            execute(args);
        }
    }, [immediate]);
    return { execute, status, isPending, data, error, refresh };
};
exports.useDataProvider = useDataProvider;
exports.default = dataProvider_1.default;
//# sourceMappingURL=index.js.map