"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppBarRoot = exports.AppBarContext = void 0;
const react_1 = require("react");
exports.AppBarContext = (0, react_1.createContext)({});
const useAppBarRoot = () => {
    const appBarContext = (0, react_1.useContext)(exports.AppBarContext);
    if (!appBarContext) {
        throw new Error('You must use table root under AppBarContext');
    }
    return appBarContext;
};
exports.useAppBarRoot = useAppBarRoot;
//# sourceMappingURL=useAppBarRoot.js.map