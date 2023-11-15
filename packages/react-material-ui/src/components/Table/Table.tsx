import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { TableProps as MuiTableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer, {
  TableContainerProps,
} from '@mui/material/TableContainer';
import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination';
import Pagination, { PaginationProps } from '@mui/material/Pagination';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import { Table, TableProps as TableStylesProps } from './Styles';
import Text from '../Text';
import Box, { BoxProps } from '@mui/material/Box';
import { sortTable } from '../../utils/table';
import TableToolbar from './TableToolbar';
import TableHeaders from './TableHeaders';
import TableOptions from './TableOptions';
import useTheme from '@mui/material/styles/useTheme';
import { TableProps as TableInputProps } from './useTable';

export type HeadersProps = {
  disablePadding?: boolean;
  id: string;
  label: string;
  numeric?: boolean;
  textAlign?: 'left' | 'center' | 'right';
};

export type CustomTableCell = {
  sortableValue?: string | number;
  component: ReactNode;
};

export type RowsProps = {
  id: string;
  [key: string]: string | number | CustomTableCell;
};

export type SelectedRows = {
  selectedRows: RowsProps[];
};

export type CustomRowOptionsProps = {
  row: RowsProps;
  close: () => void;
};

export type SimpleActionButton = {
  key: string;
  onClick: ({ selectedRows }: SelectedRows) => void;
  renderItem: ReactNode;
};

export type SimpleOptionButton = {
  key: string;
  onClick: (row: RowsProps) => void;
  text?: string;
  icon?: ReactNode;
};

export type Order = 'asc' | 'desc';

export type TableProps = {
  rows: RowsProps[];
  containerProps?: BoxProps;
  tableContainerProps?: TableContainerProps;
  count?: TableInputProps['count'];
  total?: TableInputProps['total'];
  page?: TableInputProps['page'];
  pageCount?: TableInputProps['pageCount'];
  rowsPerPage?: TableInputProps['rowsPerPage'];
  order?: Order;
  orderBy?: TableInputProps['orderBy'];
  setPage?: TableInputProps['setPage'];
  setRowsPerPage?: TableInputProps['setRowsPerPage'];
  setOrder?: TableInputProps['setOrder'];
  setOrderBy?: TableInputProps['setOrderBy'];
  headers: HeadersProps[];
  hasCheckboxes?: boolean;
  hasOptions?: boolean;
  customToolbarActionButtons?:
    | SimpleActionButton[]
    | (({ selectedRows }: SelectedRows) => void);
  customRowOptions?:
    | SimpleOptionButton[]
    | (({ row, close }: CustomRowOptionsProps) => ReactNode);
  variant?: TableStylesProps['variant'];
  paginationVariant?: 'default' | 'numbers';
  toggleDirection?: 'horizontal' | 'vertical';
  hover?: boolean;
  tableStyles?: MuiTableProps['sx'];
  tableHeaderRowStyles?: MuiTableProps['sx'];
  tableHeaderCellStyles?: MuiTableProps['sx'];
  tableRowStyles?: MuiTableProps['sx'];
  tableCellStyles?: MuiTableProps['sx'];
  paginationStyles?: TablePaginationProps['sx'] | PaginationProps['sx'];
};

const TableComponent: FC<TableProps> = ({
  rows,
  containerProps,
  tableContainerProps,
  count,
  total,
  page,
  pageCount,
  rowsPerPage,
  order,
  orderBy,
  setPage,
  setRowsPerPage,
  setOrder,
  setOrderBy,
  headers,
  hasCheckboxes,
  hasOptions,
  customToolbarActionButtons,
  customRowOptions,
  variant = 'contained',
  paginationVariant = 'default',
  toggleDirection = 'horizontal',
  hover = true,
  tableStyles,
  tableHeaderRowStyles,
  tableHeaderCellStyles,
  tableRowStyles,
  tableCellStyles,
  paginationStyles,
}) => {
  const theme = useTheme();

  const [_order, _setOrder] = React.useState<TableInputProps['order']>(
    order || 'asc',
  );
  const [_orderBy, _setOrderBy] = React.useState<string>(orderBy || 'id');
  const [_page, _setPage] = React.useState(page || 1);
  const [_rowsPerPage, _setRowsPerPage] = React.useState(rowsPerPage || 5);
  const [selected, setSelected] = React.useState<RowsProps[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = _orderBy === property && _order === 'asc';
    _setOrder(isAsc ? 'desc' : 'asc');
    setOrder?.(isAsc ? 'desc' : 'asc');
    _setOrderBy(property);
    setOrderBy?.(property);
    handleChangePage('', 1);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: RowsProps) => {
    if (!hasCheckboxes) return;

    const selectedIndex = selected.findIndex((_row) => _row.id === row.id);
    let newSelected: RowsProps[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  useEffect(() => {
    if (typeof page === 'number') _setPage(page + 1);
  }, [page]);

  useEffect(() => {
    if (rowsPerPage) _setRowsPerPage(rowsPerPage);
  }, [rowsPerPage]);

  useEffect(() => {
    if (order) _setOrder(order);
  }, [order]);

  useEffect(() => {
    if (orderBy) _setOrderBy(orderBy);
  }, [orderBy]);

  const handleChangePage = (event: unknown, newPage: number) => {
    _setPage(newPage);
    setPage?.(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    _setRowsPerPage(parseInt(event.target.value, 10));
    setRowsPerPage?.(parseInt(event.target.value, 10));
    _setPage(1);
    setPage?.(1);
  };

  const isSelected = (id: string) =>
    selected.findIndex((_row) => _row.id === id) !== -1;

  const getCellData = (cell: CustomTableCell | string | number) => {
    if (typeof cell === 'number' || typeof cell === 'string') {
      return (
        <Text fontSize={14} fontWeight={400} color="text.primary">
          {cell}
        </Text>
      );
    }

    if ('component' in cell && typeof cell.sortableValue !== 'undefined') {
      return cell.component;
    }
  };

  const renderRowCells = (row: RowsProps) =>
    headers.map((hd) => {
      return <TableCell key={hd.id}>{getCellData(row[hd.id])}</TableCell>;
    });

  const renderToolbar = useMemo(() => {
    if (typeof customToolbarActionButtons === 'function') {
      return (
        <TableToolbar numSelected={selected.length}>
          {customToolbarActionButtons?.({ selectedRows: selected })}
        </TableToolbar>
      );
    }

    if (Array.isArray(customToolbarActionButtons)) {
      return (
        <TableToolbar numSelected={selected.length}>
          {customToolbarActionButtons.map((item) => (
            <Box
              sx={{ cursor: 'pointer', px: 1 }}
              onClick={() => item.onClick({ selectedRows: selected })}
              key={item.key}
            >
              {item.renderItem}
            </Box>
          ))}
        </TableToolbar>
      );
    }

    return;
  }, [customToolbarActionButtons, selected]);

  const rowsToRender = () => {
    if (rows.length <= rowsPerPage) {
      return rows.sort((a, b) => sortTable(a, b, _order, _orderBy));
    }

    return rows
      .sort((a, b) => sortTable(a, b, _order, _orderBy))
      .slice(
        (_page - 1) * _rowsPerPage,
        (_page - 1) * _rowsPerPage + _rowsPerPage,
      );
  };

  return (
    <Box width="100%" {...containerProps}>
      <>
        {renderToolbar}

        <TableContainer {...tableContainerProps}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
            variant={variant}
            tableStyles={tableStyles}
            tableHeaderRowStyles={tableHeaderRowStyles}
            tableHeaderCellStyles={tableHeaderCellStyles}
            tableRowStyles={tableRowStyles}
            tableCellStyles={tableCellStyles}
          >
            <TableHeaders
              numSelected={selected.length}
              order={_order}
              orderBy={_orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={count || rows?.length}
              headers={headers}
              hasCheckboxes={hasCheckboxes}
              hasOptions={hasOptions}
            />
            <TableBody>
              {rowsToRender()?.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `table-checkbox-${index}`;

                return (
                  <TableRow
                    hover={hover}
                    onClick={(event) => handleClick(event, row)}
                    role={hasCheckboxes ? 'checkbox' : ''}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {hasCheckboxes && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row)}
                        />
                      </TableCell>
                    )}

                    {renderRowCells(row)}

                    {hasOptions && (
                      <TableCell>
                        <TableOptions
                          row={row}
                          customRowOptions={customRowOptions}
                          toggleDirection={toggleDirection}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {paginationVariant === 'default' && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total || rows?.length || 0}
            rowsPerPage={rowsPerPage || _rowsPerPage}
            page={_page ? _page - 1 : 0}
            onPageChange={(event: unknown, page: number) =>
              handleChangePage(event, page + 1)
            }
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ...(variant === 'outlined' && {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[800],
                border: `solid 1px #e5e7eb`,
                borderTop: 'none',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                borderLeftStyle: 'solid',
                borderRightStyle: 'solid',
              }),
            }}
          />
        )}
        {paginationVariant === 'numbers' && (
          <Box display="flex" justifyContent="center">
            <Pagination
              count={
                pageCount || (rows?.length && Math.ceil(rows?.length / 5)) || 0
              }
              onChange={handleChangePage}
              page={_page}
              sx={paginationStyles}
            />
          </Box>
        )}
      </>
    </Box>
  );
};

export default TableComponent;
