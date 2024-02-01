import { createTableStyles } from '../../../components/Table/utils';
import { Theme } from '@mui/material';

export const generateTableTheme = (theme: Theme) =>
  createTableStyles({
    table: {
      height: '100%',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'auto',
    },
    tableHeader: {
      ...theme.typography.caption,
      lineHeight: 1,
      fontWeight: 500,
      color: theme.palette.grey[500],
    },
    tableRow: {
      backgroundColor: '#F9FAFB',
      textTransform: 'uppercase',
    },
    tableContainer: {
      flex: 1,
    },
  });
