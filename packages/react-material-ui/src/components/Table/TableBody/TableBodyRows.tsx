'use client';

import React from 'react';
import { sortTable } from '../../../utils/table';
import { Order, RenderRowFunction, RowProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';
import { TableBodyRow } from './TableBodyRow';
import { TableBodyCells } from './TableBodyCells';

/**
 * Returns a paginated and sorted subset of rows based on the current page, rowsPerPage, order, and orderBy.
 *
 * @param rows - The array of rows to paginate and sort.
 * @param page - The current page number.
 * @param rowsPerPage - The number of rows per page.
 * @param order - The sort order (e.g., 'asc' or 'desc').
 * @param orderBy - The field to sort by.
 * @returns A paginated and sorted array of rows.
 */
export const getPaginatedRows = (
  rows: RowProps[],
  page: number,
  rowsPerPage: number,
  order: Order,
  orderBy: string,
) =>
  rows
    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
    .sort((a, b) => sortTable(a, b, order, orderBy));

/**
 * Render a default row for a table body with provided row data.
 *
 * @param row - The data for the row.
 * @returns A React JSX element representing the default row.
 */
const renderDefaultRow = (row: RowProps) => (
  <TableBodyRow row={row}>
    <TableBodyCells row={row} />
  </TableBodyRow>
);

/**
 * Renders a table row based on the provided data and rendering function.
 *
 * @param row - The data for the row.
 * @param renderRow - The function used to render the row.
 * @param [labelId] - The optional label ID for the row.
 * @returns The rendered table row.
 */
const renderTableRows = (
  row: RowProps,
  renderRow: RenderRowFunction,
  labelId?: string,
) => {
  if (!renderRow) {
    return renderDefaultRow(row);
  }

  return renderRow(row, labelId);
};

type TableBodyRowProps = {
  renderRow?: RenderRowFunction;
};

/**
 * Represents a component for rendering a table's body rows based on the provided renderRow function.
 *
 * @param {TableBodyRowProps} props - The props for the TableBodyRows component.
 * @returns An array of React elements representing the table body rows.
 */
export const TableBodyRows = ({ renderRow }: TableBodyRowProps) => {
  const { rows, tableQuery, isControlled } = useTableRoot();
  const { page, rowsPerPage, order, orderBy } = tableQuery;

  if (isControlled) {
    return rows.map((row, index) => {
      const labelId = `table-checkbox-${index}`;

      return renderTableRows(row, renderRow, labelId);
    });
  }

  return getPaginatedRows(rows, page, rowsPerPage, order, orderBy).map(
    (row, index) => {
      const labelId = `table-checkbox-${index}`;

      return renderTableRows(row, renderRow, labelId);
    },
  );
};
