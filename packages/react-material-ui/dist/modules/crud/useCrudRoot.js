"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCrudRoot = exports.CrudContext = void 0;
const react_1 = require("react");
exports.CrudContext = (0, react_1.createContext)({});
const useCrudRoot = () => {
    const tableRootContext = (0, react_1.useContext)(exports.CrudContext);
    return tableRootContext;
};
exports.useCrudRoot = useCrudRoot;
//# sourceMappingURL=useCrudRoot.js.map