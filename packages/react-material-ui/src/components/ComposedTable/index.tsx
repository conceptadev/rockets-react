import React, { useState, useEffect } from 'react';

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
import { Settings } from '@mui/icons-material';
import { useAuth } from '@concepta/react-auth-provider';
import { usePathname } from 'next/navigation';

import Table from '../Table';
import { StyleDefinition, generateTableTheme } from './constants';
import { Filter } from '../Filter';
import OrderableDropDown, { ListItem } from '../OrderableDropDown';
import { useSettingsStorage } from '../../hooks/useSettingsStorage';

export type ComposedTableProps = {
  data: unknown[];
  isPending?: boolean;
  tableTheme?: StyleDefinition;
} & TableRootProps &
  Partial<FilterProps>;

const ComposedTable = (props: ComposedTableProps) => {
  const theme = useTheme();
  const tableTheme = generateTableTheme(theme, props.tableTheme);

  const auth = useAuth();
  const pathname = usePathname();

  const [settings, setSettings] = useSettingsStorage({
    key: props.settingsId || pathname,
    type: 'table',
    assignee: {
      id: (auth?.user as { id: string })?.id ?? '',
    },
    data: props.headers.map((header) => ({
      id: header.id,
      hide: Boolean(header.hide),
    })),
  });

  const [orderableHeaders, setOrderableHeaders] = useState(props.headers);

  const handleHeadersOrderChange = (list: ListItem[]) => {
    setOrderableHeaders(list);
    setSettings(list);
  };

  useEffect(() => {
    if (settings.length) {
      setOrderableHeaders(
        settings.map((item: ListItem) => {
          const headerItem = props.headers.find(
            (header) => header.id === item.id,
          );

          return {
            ...item,
            ...headerItem,
          };
        }),
      );
    }
  }, []);

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
                  setList={handleHeadersOrderChange}
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
