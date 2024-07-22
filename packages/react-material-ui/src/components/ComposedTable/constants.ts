import { createTableStyles } from '../Table/utils';
import { Theme, SxProps } from '@mui/material/styles';

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

export const generateTableTheme = (
  theme: Theme,
  customTableTheme?: StyleDefinition,
) =>
  createTableStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'auto',
      ...customTableTheme?.root,
    },
    table: {
      height: '100%',
      ...customTableTheme?.table,
    },
    tableContainer: {
      flex: 1,
      ...customTableTheme?.tableContainer,
    },
    tableHeader: {
      ...theme.typography.caption,
      lineHeight: 1,
      fontWeight: 500,
      color: theme.palette.grey[500],
      ...customTableTheme?.tableHeader,
    },
    tableHeaderRow: {
      backgroundColor: '#F9FAFB',
      textTransform: 'uppercase',
      ...customTableTheme?.tableHeaderRow,
    },
    ...customTableTheme,
  });
