'use client';

import { Table } from './Table';
import { TablePagination } from './TablePagination';
import { TablePaginationNumbers } from './TablePaginationNumbers';
import { TableHeaderCells } from './TableHeader/TableHeaderCells';
import { TableHeaderCheckbox } from './TableHeader/TableHeaderCheckbox';
import { TableHeaderOption } from './TableHeader/TableHeaderOption';
import { TableBodyCells } from './TableBody/TableBodyCells';
import { TableBodyCheckbox } from './TableBody/TableBodyCheckbox';
import { TableBodyOption } from './TableBody/TableBodyOption';
import { TableBodyRow } from './TableBody/TableBodyRow';
import { TableBodyRows } from './TableBody/TableBodyRows';
import { TableRoot } from './TableRoot';
import { TableHeaderCell } from './TableHeader/TableHeaderCell';

const TableComponent = {
  Table,
  BodyCell: TableBodyCells,
  BodyCheckboxes: TableBodyCheckbox,
  BodyOption: TableBodyOption,
  BodyRow: TableBodyRow,
  BodyRows: TableBodyRows,
  Pagination: TablePagination,
  PaginationNumbers: TablePaginationNumbers,
  HeaderCell: TableHeaderCell,
  HeaderCells: TableHeaderCells,
  HeaderCheckbox: TableHeaderCheckbox,
  HeaderOption: TableHeaderOption,
  Root: TableRoot,
};

export default TableComponent;
