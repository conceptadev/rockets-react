import MuiTable from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Table = styled(MuiTable)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
  marginTop: '-10px',

  th: {
    border: 'none',
  },
  td: {
    border: `solid 1px ${theme.palette.primary.main}`,
    borderStyle: 'solid none',
    padding: '10px',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
  },
  'td:first-child': {
    borderLeftStyle: 'solid',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
  'td:last-child': {
    borderRightStyle: 'solid',
    borderBottomRightRadius: '10px',
    borderTopRightRadius: '10px',
  },
}));

export const IconContainer = styled(Box)(() => ({
  display: 'flex',
  marginRight: '8px',
  marginLeft: '-4px',
}));
