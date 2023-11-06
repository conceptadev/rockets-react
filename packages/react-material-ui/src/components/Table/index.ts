import { Table } from './Table';
import { TablePagination } from './TablePagination';
import { TablePaginationNumbers } from './TablePaginationNumbers';
import { TableHeaderCell } from './TableHeader/TableHeaderCell';
import { TableHeaderCheckbox } from './TableHeader/TableHeaderCheckbox';
import { TableHeaderOption } from './TableHeader/TableHeaderOption';
import { TableBodyCell } from './TableBody/TableBodyCell';
import { TableBodyCheckbox } from './TableBody/TableBodyCheckbox';
import { TableBodyOption } from './TableBody/TableBodyOption';
import { TableBodyRow } from './TableBody/TableBodyRow';
import { TableBodyRows } from './TableBody/TableBodyRows';
import { TableRoot } from './TableRoot';
import MSWTableStyles from './TableStyles/MSWTableStyles';

export { MSWTableStyles };

const TableComponent = {
  Table,
  BodyCell: TableBodyCell,
  BodyCheckboxes: TableBodyCheckbox,
  BodyOption: TableBodyOption,
  BodyRow: TableBodyRow,
  BodyRows: TableBodyRows,
  Pagination: TablePagination,
  PaginationNumbers: TablePaginationNumbers,
  HeaderCell: TableHeaderCell,
  HeaderCheckbox: TableHeaderCheckbox,
  HeaderOption: TableHeaderOption,
  Root: TableRoot,
};

export default TableComponent;
