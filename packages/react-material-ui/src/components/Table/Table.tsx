import React, { FC, ReactNode, useMemo } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';

import TableRow from '@mui/material/TableRow';
import { Table } from './Styles';
import Text from '../Text';
import Box from '../Box';
import { sortTable } from '../../utils/table';
import TableToolbar from './TableToolbar';
import TableHeaders from './TableHeaders';
import TableOptions from './TableOptions';

export type HeadersProps = {
  disablePadding?: boolean;
  id: string;
  label: string;
  numeric?: boolean;
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

type Props = {
  rows: RowsProps[];
  headers: HeadersProps[];
  hasCheckboxes?: boolean;
  hasOptions?: boolean;
  customToolbarActionButtons?:
    | SimpleActionButton[]
    | (({ selectedRows }: SelectedRows) => void);
  customRowOptions?:
    | SimpleOptionButton[]
    | (({ row, close }: CustomRowOptionsProps) => ReactNode);
};

export type Order = 'asc' | 'desc';

const TableComponent: FC<Props> = ({
  rows,
  headers,
  hasCheckboxes,
  hasOptions,
  customToolbarActionButtons,
  customRowOptions,
}) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('id');
  const [selected, setSelected] = React.useState<RowsProps[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) =>
    selected.findIndex((_row) => _row.id === id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const getCellData = (cell: CustomTableCell | string | number) => {
    if (typeof cell === 'number' || typeof cell === 'string') {
      return (
        <Text fontSize={14} fontWeight={400} color="text.primary">
          {cell}
        </Text>
      );
    }

    if ('component' in cell && cell.sortableValue) {
      return cell.component;
    }
  };

  const renderRowCells = (row: RowsProps) => {
    return Object.keys(row).map((key) => {
      if (key === 'id') return;
      return <TableCell key={key}>{getCellData(row[key])}</TableCell>;
    });
  };

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

  return (
    <Box sx={{ width: '100%' }}>
      <>
        {renderToolbar}

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHeaders
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headers={headers}
              hasCheckboxes={hasCheckboxes}
              hasOptions={hasOptions}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort((a, b) => sortTable(a, b, order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
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
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    </Box>
  );
};

export default TableComponent;
