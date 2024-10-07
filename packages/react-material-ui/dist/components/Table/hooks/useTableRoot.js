"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableRoot = exports.TableContext = void 0;
const react_1 = require("react");
exports.TableContext = (0, react_1.createContext)({});
const useTableRoot = () => {
    const tableRootContext = (0, react_1.useContext)(exports.TableContext);
    if (!tableRootContext) {
        throw new Error('You must use table root under TableRootContext');
    }
    return tableRootContext;
};
exports.useTableRoot = useTableRoot;
//# sourceMappingURL=useTableRoot.js.map