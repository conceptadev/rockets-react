"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Breadcrumbs_1 = __importDefault(require("@mui/material/Breadcrumbs"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const NavigateNext_1 = __importDefault(require("@mui/icons-material/NavigateNext"));
function Breadcrumbs({ routes }) {
    const breadcrumbs = routes.slice(0, -1).map((routeItem, index) => {
        return (react_1.default.createElement(Link_1.default, { underline: "hover", key: index + 1, color: "inherit", href: routeItem.href }, routeItem.label));
    });
    const lastItem = routes.at(-1);
    if (!routes.length) {
        return null;
    }
    return (react_1.default.createElement(Stack_1.default, { spacing: 2 },
        react_1.default.createElement(Breadcrumbs_1.default, { separator: react_1.default.createElement(NavigateNext_1.default, { fontSize: "small" }), "aria-label": "breadcrumbs" },
            breadcrumbs,
            lastItem ? (react_1.default.createElement(Typography_1.default, { color: "text.primary" }, lastItem.label)) : null)));
}
exports.default = Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map