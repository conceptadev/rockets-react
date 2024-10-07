"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSearchParams = (searchParams, newParams) => {
    const newSearchParam = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(newParams)) {
        const param = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get(key);
        const parsedValue = typeof value === 'number' ? Number(param) : param;
        if (!value) {
            newSearchParam.delete(key);
        }
        else if (value !== parsedValue) {
            newSearchParam.set(key, String(value));
        }
    }
    const stringfiedNewSearchParam = newSearchParam.toString();
    if (stringfiedNewSearchParam) {
        return stringfiedNewSearchParam;
    }
    return null;
};
exports.default = getSearchParams;
//# sourceMappingURL=getSearchParams.js.map