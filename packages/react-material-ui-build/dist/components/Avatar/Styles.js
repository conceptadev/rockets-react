"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const styles_1 = require("@mui/material/styles");
exports.Image = (0, styles_1.styled)('img')(({ size }) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    margin: '0 12px',
    objectFit: 'cover',
}));
//# sourceMappingURL=Styles.js.map