import { createTableStyles } from '../../../components/Table/utils';
import { Theme } from '@mui/material/styles';
import { StyleDefinition } from '../../../components/submodules/Table';

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
      ...customTableTheme?.tableHeaderRow,
    },
    ...customTableTheme,
  });
