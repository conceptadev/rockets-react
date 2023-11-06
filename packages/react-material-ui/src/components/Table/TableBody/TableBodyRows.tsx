import { sortTable } from '../../../utils/table';
import { ReactNode } from 'react';
import { Order, RowsProps } from '../types';
import { useTableRoot } from '../hooks/useTableRoot';

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
  rows: RowsProps[],
  page: number,
  rowsPerPage: number,
  order: Order,
  orderBy: string,
) =>
  rows
    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
    .sort((a, b) => sortTable(a, b, order, orderBy));

type TableBodyRowsProps = {
  renderRow: (row: RowsProps, labelId: string) => ReactNode;
};

/**
 * Represents a component for rendering a table's body rows based on the provided renderRow function.
 *
 * @param {TableBodyRowsProps} props - The props for the TableBodyRows component.
 * @returns An array of React elements representing the table body rows.
 */
export const TableBodyRows = ({ renderRow }: TableBodyRowsProps) => {
  const { rows, tableQuery } = useTableRoot();
  const { page, rowsPerPage, order, orderBy } = tableQuery;

  return getPaginatedRows(rows, page, rowsPerPage, order, orderBy).map(
    (row, index) => {
      const labelId = `table-checkbox-${index}`;

      return renderRow(row, labelId);
    },
  );
};
