import React, { useState } from 'react';

import type { TableRootProps } from '../Table/TableRoot';
import type { FilterProps } from '../Filter/Filter';

import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import Settings from '@mui/icons-material/Settings';

import Table from '../Table';
import { StyleDefinition, generateTableTheme } from './constants';
import { Filter } from '../Filter';
import OrderableDropDown from '../OrderableDropDown';

export type ComposedTableProps = {
  data: unknown[];
  isPending?: boolean;
  tableTheme?: StyleDefinition;
} & TableRootProps &
  Partial<FilterProps>;

const ComposedTable = (props: ComposedTableProps) => {
  const theme = useTheme();
  const tableTheme = generateTableTheme(theme, props.tableTheme);

  const [orderableHeaders, setOrderableHeaders] = useState(props.headers);

  return (
    <Box>
      <Table.Root
        {...props}
        headers={orderableHeaders}
        sx={tableTheme.root}
        key={JSON.stringify(orderableHeaders)}
      >
        <Box my={3}>
          <Filter
            {...props}
            filters={props.filters || []}
            complementaryActions={(filters) => (
              <Box display="flex" gap={2}>
                <OrderableDropDown
                  icon={<Settings />}
                  list={orderableHeaders}
                  setList={setOrderableHeaders}
                />
                {typeof props.complementaryActions === 'function'
                  ? props.complementaryActions(filters)
                  : props.complementaryActions}
              </Box>
            )}
          />
        </Box>
        <TableContainer sx={tableTheme.tableContainer}>
          <Table.Table stickyHeader variant="outlined" sx={tableTheme.table}>
            <TableHead>
              <TableRow sx={tableTheme.tableHeaderRow}>
                <Table.HeaderCells
                  renderCell={(cell) => (
                    <Table.HeaderCell cell={cell} sx={tableTheme.tableHeader} />
                  )}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(!props.isPending && !props.data?.length) && (
                <TableRow sx={tableTheme.tableBodyRow}>
                  <TableCell
                    colSpan={props.headers.length}
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              )}
              <Table.BodyRows
                renderRow={(row) => (
                  <Table.BodyRow
                    row={row}
                    hasCheckboxes={false}
                    hover={false}
                    sx={tableTheme.tableBodyRow}
                  >
                    <Table.BodyCell row={row} sx={tableTheme.tableBodyCell} />
                  </Table.BodyRow>
                )}
              />
            </TableBody>
          </Table.Table>
        </TableContainer>
        <Table.Pagination variant="outlined" />
      </Table.Root>
    </Box>
  );
};

export default ComposedTable;
