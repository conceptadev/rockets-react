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
exports.TableColumnOrderable = void 0;
const react_1 = __importStar(require("react"));
const useTableRoot_1 = require("./hooks/useTableRoot");
const OrderableDropDown_1 = require("../OrderableDropDown");
const TableColumnOrderable = ({ hasAllOption, text, icon, orderableListCacheKey, cacheApiPath, }) => {
    const { headers, setHeaders } = (0, useTableRoot_1.useTableRoot)();
    const [headerOrder, setHeaderOrder] = (0, react_1.useState)(headers.map((header) => ({ id: header.id, label: header.label })));
    const handleListUpdateFromCache = (cacheList) => {
        const newHeaders = cacheList.map((header) => {
            const originalHeader = headers.find(({ id }) => id === header.id);
            return Object.assign(Object.assign({}, originalHeader), { hide: header.hide });
        });
        setHeaderOrder(newHeaders);
    };
    (0, react_1.useEffect)(() => {
        const newOrderedHeaders = headerOrder.map((header) => {
            const originalHeader = headers.find((h) => h.id === header.id);
            return Object.assign(Object.assign({}, originalHeader), { hide: header.hide });
        });
        setHeaders(newOrderedHeaders);
    }, [headerOrder]);
    return (react_1.default.createElement(OrderableDropDown_1.OrderableDropDown, { hasAllOption: hasAllOption, list: headerOrder, setList: setHeaderOrder, icon: icon, text: text, storage: {
            type: 'table',
            key: orderableListCacheKey,
            cacheApiPath: cacheApiPath,
            onListUpdateFromCache: handleListUpdateFromCache,
        } }));
};
exports.TableColumnOrderable = TableColumnOrderable;
//# sourceMappingURL=TableColumnOrderable.js.map