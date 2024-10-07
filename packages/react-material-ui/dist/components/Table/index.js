"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTable = void 0;
const Table_1 = require("./Table");
const TablePagination_1 = require("./TablePagination");
const TablePaginationNumbers_1 = require("./TablePaginationNumbers");
const TableHeaderCells_1 = require("./TableHeader/TableHeaderCells");
const TableHeaderCheckbox_1 = require("./TableHeader/TableHeaderCheckbox");
const TableHeaderOption_1 = require("./TableHeader/TableHeaderOption");
const TableBodyCells_1 = require("./TableBody/TableBodyCells");
const TableBodyCheckbox_1 = require("./TableBody/TableBodyCheckbox");
const TableBodyOption_1 = require("./TableBody/TableBodyOption");
const TableBodyRow_1 = require("./TableBody/TableBodyRow");
const TableBodyRows_1 = require("./TableBody/TableBodyRows");
const TableRoot_1 = require("./TableRoot");
const TableHeaderCell_1 = require("./TableHeader/TableHeaderCell");
const TableRowSkeleton_1 = require("./TableRowSkeleton");
const TableCellSkeleton_1 = require("./TableCellSkeleton");
const TableColumnOrderable_1 = require("./TableColumnOrderable");
const useTable_1 = __importDefault(require("./useTable"));
exports.useTable = useTable_1.default;
const TableComponent = {
    Table: Table_1.Table,
    BodyCell: TableBodyCells_1.TableBodyCells,
    BodyCheckboxes: TableBodyCheckbox_1.TableBodyCheckbox,
    BodyOption: TableBodyOption_1.TableBodyOption,
    BodyRow: TableBodyRow_1.TableBodyRow,
    BodyRows: TableBodyRows_1.TableBodyRows,
    Pagination: TablePagination_1.TablePagination,
    PaginationNumbers: TablePaginationNumbers_1.TablePaginationNumbers,
    HeaderCell: TableHeaderCell_1.TableHeaderCell,
    HeaderCells: TableHeaderCells_1.TableHeaderCells,
    HeaderCheckbox: TableHeaderCheckbox_1.TableHeaderCheckbox,
    HeaderOption: TableHeaderOption_1.TableHeaderOption,
    Root: TableRoot_1.TableRoot,
    CellSkeleton: TableCellSkeleton_1.TableCellSkeleton,
    RowSkeleton: TableRowSkeleton_1.TableRowSkeleton,
    ColumnOrderable: TableColumnOrderable_1.TableColumnOrderable,
};
exports.default = TableComponent;
//# sourceMappingURL=index.js.map