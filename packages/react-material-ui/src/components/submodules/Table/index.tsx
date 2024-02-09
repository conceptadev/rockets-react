import React from 'react';

import type {
  HeaderProps,
  RowProps,
  TableQueryStateProps,
} from '../../Table/types';

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Theme,
  SxProps,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { toast } from 'react-toastify';

import Filter from '../../../components/Filter';
import { FilterType } from '../../../components/Filter/Filter';
import Table from '../../../components/Table';
import { generateTableTheme } from './constants';
import { TableRootProps } from '../../../components/Table/TableRoot';
import { TableProps } from '../../../components/Table/Table';

type Action = 'creation' | 'edit' | 'details' | null;

type BasicType = string | number | boolean;

type SimpleFilter = Record<string, BasicType | BasicType[] | null>;

type ActionCallbackPayload = {
  action: Action;
  row: Record<string, unknown>;
};

export type StyleDefinition = {
  root?: SxProps<Theme>;
  table?: SxProps<Theme>;
  tableContainer?: SxProps<Theme>;
  tableHeader?: SxProps<Theme>;
  tableHeaderRow?: SxProps<Theme>;
  tableHeaderCell?: SxProps<Theme>;
  tableBodyRow?: SxProps<Theme>;
  tableBodyCell?: SxProps<Theme>;
  [key: string]: SxProps<Theme>;
};

type TableSchemaItem = HeaderProps & {
  format?: (data: unknown) => string | number;
};

interface TableSubmoduleProps {
  tableRootProps?: TableRootProps;
  tableProps?: TableProps;
  tableTheme?: StyleDefinition;
  queryResource: string;
  tableSchema: TableSchemaItem[];
  onAction?: ({ action, row }: ActionCallbackPayload) => void;
  onAddNew?: () => void;
  refresh: () => void;
  data: unknown[];
  isPending: boolean;
  total: number;
  pageCount: number;
  simpleFilter: SimpleFilter;
  updateSimpleFilter: (
    simpleFilter: SimpleFilter | null,
    resetPage?: boolean,
  ) => void;
  tableQueryState: TableQueryStateProps;
  setTableQueryState: React.Dispatch<
    React.SetStateAction<TableQueryStateProps>
  >;
  searchParam?: string;
  hideActionsColumn?: boolean;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
  hideDetailsButton?: boolean;
  hideAddButton?: boolean;
  reordable?: boolean;
}

const TableSubmodule = (props: TableSubmoduleProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();

  const { del } = useDataProvider();

  const { execute: deleteItem } = useQuery(
    (id: string | number) =>
      del({
        uri: `/${props.queryResource}/${id}`,
      }),
    false,
    {
      onSuccess: () => {
        toast.success('Data successfully deleted.');

        if (props.refresh) {
          props.refresh();
        }
      },
      onError: () => toast.error('Failed to delete data.'),
    },
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);

    if (!props.updateSimpleFilter || !props.searchParam) {
      return;
    }

    if (!term) {
      props.updateSimpleFilter(
        {
          [props.searchParam]: null,
        },
        true,
      );

      return;
    }

    const filter = {
      [props.searchParam]: `||$contL||${term}`,
    };

    props.updateSimpleFilter(filter, true);
  };

  const tableTheme = generateTableTheme(theme, props.tableTheme);

  const noActions =
    props.hideEditButton && props.hideDeleteButton && props.hideDetailsButton;

  const tableHeaders: TableSchemaItem[] = useMemo(() => {
    return [
      ...props.tableSchema,
      ...(!props.hideActionsColumn && !noActions
        ? [{ id: 'actions', label: '' }]
        : []),
    ];
  }, [props]);

  const tableRows: RowProps[] = useMemo(() => {
    const data = props.data || [];

    return data.map((row) => {
      const rowData = row as Record<string, unknown>;
      const newData = { ...rowData };

      Object.entries(rowData).forEach(([key, data]) => {
        const schemaItem = tableHeaders.find((item) => item.id === key);

        if (!schemaItem) {
          return;
        }

        if (schemaItem.format) {
          newData[key] = schemaItem.format(data);
        }
      });

      return {
        ...newData,
        id: String(rowData.id),
        actions: {
          component: (
            <Box>
              {!props.hideEditButton && (
                <IconButton
                  onClick={() => {
                    if (props.onAction) {
                      props.onAction({ action: 'edit', row: rowData });
                    }
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}

              {!props.hideDeleteButton && (
                <IconButton onClick={() => deleteItem(rowData.id)}>
                  <DeleteIcon />
                </IconButton>
              )}

              {!props.hideDetailsButton && (
                <IconButton
                  onClick={() => {
                    if (props.onAction) {
                      props.onAction({ action: 'details', row: rowData });
                    }
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            </Box>
          ),
        },
      };
    });
  }, [props, tableHeaders, deleteItem]);

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {props.searchParam && (
          <Box sx={{ width: '60%' }}>
            <Filter
              filters={[
                {
                  id: 'search',
                  label: 'Search',
                  type: FilterType.Text,
                  defaultValue: searchTerm,
                  placeholder: 'Search',
                  onChange: handleSearchChange,
                },
              ]}
            />
          </Box>
        )}
        {!props.hideAddButton && (
          <Button variant="contained" onClick={props.onAddNew}>
            Add new
          </Button>
        )}
      </Box>

      <Table.Root
        rows={tableRows}
        headers={tableHeaders}
        total={props.total}
        pageCount={props.pageCount}
        sx={tableTheme.root}
        tableQueryState={props.tableQueryState}
        updateTableQueryState={props.setTableQueryState}
        {...props.tableRootProps}
      >
        {props.reordable !== false && <Table.ColumnOrderable />}
        <TableContainer sx={tableTheme.tableContainer}>
          <Table.Table
            stickyHeader
            variant="outlined"
            sx={tableTheme.table}
            {...props.tableProps}
          >
            <TableHead>
              <TableRow sx={tableTheme.tableHeaderRow}>
                <Table.HeaderCells
                  renderCell={(cell: HeaderProps) => (
                    <Table.HeaderCell
                      key={cell.id}
                      cell={cell}
                      sx={tableTheme.tableHeaderCell}
                    />
                  )}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(searchTerm && !props.data?.length) && (
                <TableRow sx={tableTheme.tableBodyRow}>
                  <TableCell
                    colSpan={tableHeaders.length}
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

export default TableSubmodule;
