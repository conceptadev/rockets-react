import React, { useState, ReactNode } from 'react';

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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import get from 'lodash/get';

import Table from '../../Table';
import { generateTableTheme } from './constants';
import { TableRootProps } from '../../Table/TableRoot';
import { TableProps } from '../../Table/Table';
import FilterSubmodule from '../../submodules/Filter';
import { Search } from '../../Table/types';
import { UpdateSearch } from '../../Table/useTable';
import { useCrudRoot } from '../../../modules/crud/useCrudRoot';
import { isMobile } from '../../../utils/isMobile';
import MobileRowModal from './MobileRowModal';

import { useTranslation } from '../../../utils/intl/i18n';

type Action = 'creation' | 'edit' | 'details' | null;

type BasicType = string | number | boolean;

type SimpleFilter = Record<string, BasicType | BasicType[] | null>;

type ActionCallbackPayload = {
  action: Action;
  row: Record<string, unknown>;
  index?: number;
};

export type PaginationStyle = 'default' | 'numeric';

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
  onAction?: ({ action, row, index }: ActionCallbackPayload) => void;
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
  hasAllOption?: boolean;
  hideAddButton?: boolean;
  reordable?: boolean;
  onDeleteSuccess?: (data: unknown) => void;
  onDeleteError?: (error: unknown) => void;
  filterCallback?: (filter: unknown) => void;
  externalSearch?: Search;
  search?: Search;
  updateSearch?: UpdateSearch;
  paginationStyle?: PaginationStyle;
  allowModalPreview?: boolean;
  mobileModalTitleSrc?: string;
  filterCacheKey?: string;
  tableCacheKey?: string;
  cacheApiPath?: string;
  hasCheckboxes?: boolean;
  addButtonStartIcon?: ReactNode;
  addButtonEndIcon?: ReactNode;
  addButtonContent?: ReactNode;
  additionalFilterRowContent?: ReactNode;
}

const TableSubmodule = (props: TableSubmoduleProps) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const { filters } = useCrudRoot();
  const [mobileCurrentRow, setMobileCurrentRow] = useState<RowProps | null>(
    null,
  );

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

    return data.map((row, index) => {
      const rowData = row as Record<string, unknown>;
      const newData = { ...rowData, id: String(rowData.id) };

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
          const cellData: CustomTableCell | string | number | undefined = get(
            row,
            schemaItem.source || schemaItem.id,
          );
          newData[schemaItem.id] = schemaItem.renderTableCell(
            cellData,
            rowData,
          );
          return;
        }
      });

      return {
        ...newData,
        actions: {
          component: (
            <Box display="flex">
              {!props.hideEditButton && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (props.onAction) {
                      props.onAction({ action: 'edit', row: rowData, index });
                    }
                  }}
                  data-testid="edit-button"
                >
                  <EditIcon />
                </IconButton>
              )}

              {!props.hideDeleteButton && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(rowData.id);
                  }}
                  data-testid="delete-button"
                >
                  <DeleteIcon />
                </IconButton>
              )}

              {!props.hideDetailsButton && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (props.onAction) {
                      props.onAction({
                        action: props.hideEditButton ? 'edit' : 'details',
                        row: rowData,
                        index,
                      });
                    }
                  }}
                  data-testid="details-button"
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            </Box>
          ),
        },
      };
    });
  }, [props, tableHeaders]);

  const closeModal = () => {
    setMobileCurrentRow(null);
  };

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            my: 4,
          }}
        >
          {filters && (
            <FilterSubmodule
              orderableListCacheKey={props.filterCacheKey}
              cacheApiPath={props.cacheApiPath}
            />
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'space-between', lg: 'initial' },
              mt: { xs: filters ? 2 : 0, lg: 0 },
              ml: { xs: 0, lg: 2 },
              width: { xs: '100%', lg: 'auto' },
            }}
          >
            {props.reordable !== false && (
              <Table.ColumnOrderable
                hasAllOption={props.hasAllOption}
                orderableListCacheKey={props.tableCacheKey}
                cacheApiPath={props.cacheApiPath}
              />
            )}
            {!props.hideAddButton && (
              <Button
                variant="contained"
                onClick={props.onAddNew}
                startIcon={<AddIcon />}
                sx={{
                  textTransform: 'capitalize',
                  textWrap: 'nowrap',
                  marginLeft: 2,
                }}
              >
                {t('crud:addNew')}
              </Button>
            )}
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {props.additionalFilterRowContent}
              {!props.hideAddButton && (
                <Button
                  variant="contained"
                  onClick={props.onAddNew}
                  startIcon={props.addButtonStartIcon || <AddIcon />}
                  endIcon={props.addButtonEndIcon}
                  sx={{
                    textTransform: 'capitalize',
                    textWrap: 'nowrap',
                    marginLeft: 2,
                  }}
                >
                  {props.addButtonContent || 'Add new'}
                </Button>
              )}
            </Box>
          </Box>
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
                {props.hasCheckboxes && <Table.HeaderCheckbox />}
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
                    {t('crud:emptyTable')}
                  </TableCell>
                </TableRow>
              )}
              <Table.BodyRows
                renderRow={(row, labelId) => (
                  <Table.BodyRow
                    key={row.id}
                    row={row}
                    hasCheckboxes={props.hasCheckboxes}
                    sx={tableTheme.tableBodyRow}
                    {...(isMobile &&
                      props.allowModalPreview && {
                        onClick: () => setMobileCurrentRow(row),
                      })}
                  >
                    {props.hasCheckboxes && (
                      <Table.BodyCheckboxes row={row} labelId={labelId} />
                    )}
                    <Table.BodyCell row={row} sx={tableTheme.tableBodyCell} />
                  </Table.BodyRow>
                )}
              />
            </TableBody>
          </Table.Table>
        </TableContainer>

        {props.paginationStyle === 'numeric' ? (
          <Box mt={2}>
            <Table.PaginationNumbers />
          </Box>
        ) : (
          <Table.Pagination
            variant="outlined"
            {...(isMobile && {
              labelRowsPerPage: 'per page:',
              sx: {
                display: 'flex',
                justifyContent: 'center',
                '& .MuiTablePagination-selectLabel': {
                  paddingLeft: '10px',
                },
                '& .MuiToolbar-root': {
                  padding: 0,
                },
                '& .MuiTablePagination-spacer': {
                  display: 'none',
                },
                '& .MuiTablePagination-input': {
                  marginRight: 0,
                  marginLeft: 0,
                },
                '& .MuiTablePagination-actions': {
                  marginLeft: '0 !important',
                },
              },
            })}
          />
        )}

        {props.allowModalPreview && isMobile && (
          <MobileRowModal
            currentRow={mobileCurrentRow}
            onClose={closeModal}
            titleSrc={props.mobileModalTitleSrc}
          />
        )}
      </Table.Root>
    </Box>
  );
};

export default TableSubmodule;
