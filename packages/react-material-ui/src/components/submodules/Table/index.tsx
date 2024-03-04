import React from 'react';

import type {
  CustomTableCell,
  HeaderProps,
  RowProps,
  TableQueryStateProps,
} from '../../Table/types';

import { useMemo } from 'react';
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
  Add as AddIcon,
} from '@mui/icons-material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import Table from '../../../components/Table';
import { generateTableTheme } from './constants';
import { TableRootProps } from '../../../components/Table/TableRoot';
import { TableProps } from '../../../components/Table/Table';
import FilterSubmodule from '../../../components/submodules/Filter';
import { Search } from '../../../components/Table/types';
import { UpdateSearch } from '../../../components/Table/useTable';
import { useCrudRoot } from '../../../modules/crud/useCrudRoot';

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

export type TableSchemaItem = HeaderProps & {
  format?: (data: unknown) => string | number | React.ReactNode;
  renderTableCell?: (data: unknown, rowData: unknown) => CustomTableCell;
};

export interface TableSubmoduleProps {
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
  hideActionsColumn?: boolean;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
  hideDetailsButton?: boolean;
  hideAddButton?: boolean;
  reordable?: boolean;
  onDeleteSuccess?: (data: unknown) => void;
  onDeleteError?: (error: unknown) => void;
  filterCallback?: (filter: unknown) => void;
  externalSearch?: Search;
  search?: Search;
  updateSearch?: UpdateSearch;
}

const TableSubmodule = (props: TableSubmoduleProps) => {
  const theme = useTheme();
  const { filters } = useCrudRoot();

  const { del } = useDataProvider();

  const { execute: deleteItem } = useQuery(
    (id: string | number) =>
      del({
        uri: `/${props.queryResource}/${id}`,
      }),
    false,
    {
      onSuccess: (data: unknown) => {
        if (props.refresh) {
          props.refresh();
        }

        if (props.onDeleteSuccess) {
          props.onDeleteSuccess(data);
        }
      },
      onError: props.onDeleteError,
    },
  );

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
      const newData = {};

      tableHeaders.forEach((schemaItem) => {
        if (schemaItem.format) {
          const formattedData = schemaItem.format(rowData);
          if (['string', 'number'].includes(typeof formattedData)) {
            newData[schemaItem.id] = schemaItem.format(rowData);
            return;
          }
          newData[schemaItem.id] = {
            component: schemaItem.format(rowData),
          };
          return;
        }

        if (schemaItem.renderTableCell) {
          newData[schemaItem.id] = schemaItem.renderTableCell(data, rowData);
          return;
        }

        newData[schemaItem.id] = rowData[schemaItem.source || schemaItem.id];
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
        <Box sx={{ padding: '24px 0' }}>{filters && <FilterSubmodule />}</Box>

        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          {props.reordable !== false && <Table.ColumnOrderable />}
          {!props.hideAddButton && (
            <Button
              variant="contained"
              onClick={props.onAddNew}
              startIcon={<AddIcon />}
              sx={{ textTransform: 'capitalize' }}
            >
              Add new
            </Button>
          )}
        </Box>

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
              {Boolean(!props.isPending && !props.data?.length) && (
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
