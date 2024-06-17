'use client';

import React from 'react';
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps as MuiTablePaginationProps,
  useTheme,
} from '@mui/material';
import { useTableRoot } from './hooks/useTableRoot';

import { useTranslation } from '../../utils/i18n';

type TablePaginationProps = {
  variant: 'clean' | 'contained' | 'outlined';
} & Omit<
  MuiTablePaginationProps,
  'variant' | 'page' | 'rowsPerPage' | 'count' | 'onPageChange'
>;

/**
 * Represents a component for rendering pagination controls for a table.
 *
 * @param {TablePaginationProps} props - The props for the TablePagination component.
 * @returns A React element representing the table pagination controls.
 */
export const TablePagination = ({
  variant,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...rest
}: TablePaginationProps) => {
  const theme = useTheme();

  const { rows, tableQuery, total, handleChangePage, handleChangeRowsPerPage } =
    useTableRoot();

  const { rowsPerPage, page } = tableQuery;

  const { t } = useTranslation();

  return (
    <MuiTablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={total || rows?.length || 0}
      rowsPerPage={rowsPerPage}
      page={page ? page - 1 : 0}
      onPageChange={(event: unknown, page: number) =>
        handleChangePage(event, page + 1)
      }
      onRowsPerPageChange={handleChangeRowsPerPage}
      {...rest}
      sx={[
        {
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
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      data-testid="table-pagination"
      labelRowsPerPage={`${t('table:rowsPerPage')}:`}
      labelDisplayedRows={({ from, to, count }) =>
        t('table:displayedRows', { from, to, count })
      }
    />
  );
};
