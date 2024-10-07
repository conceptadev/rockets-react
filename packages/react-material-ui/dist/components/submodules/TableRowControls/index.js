"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const TableRowControls = (props) => {
    const { isLoading, viewIndex, rowsPerPage, currentPage, pageCount, currentIndex, total, onPrevious, onNext, } = props;
    const isPreviousDisabled = isLoading || (currentPage === 1 && viewIndex === 1);
    const isNextDisabled = isLoading || (currentPage === pageCount && viewIndex === rowsPerPage);
    return (react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center", gap: 2 },
        react_1.default.createElement(material_1.IconButton, { onClick: onPrevious, disabled: isPreviousDisabled },
            react_1.default.createElement(ChevronLeft_1.default, { sx: { color: '#333' } })),
        react_1.default.createElement(material_1.Typography, { sx: { textTransform: 'uppercase', fontSize: '0.875rem' } }, isLoading ? (react_1.default.createElement(material_1.Skeleton, { variant: "text", sx: { fontSize: '0.875rem' }, width: 58, height: 22 })) : (`Row ${currentIndex}/${total}`)),
        react_1.default.createElement(material_1.IconButton, { onClick: onNext, disabled: isNextDisabled },
            react_1.default.createElement(ChevronRight_1.default, { sx: { color: '#333' } }))));
};
exports.default = TableRowControls;
//# sourceMappingURL=index.js.map