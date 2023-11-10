import MuiTable from '@mui/material/Table';
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export type TableProps = {
  variant?: 'clean' | 'contained' | 'outlined';
};

const contained = (theme: Theme) => ({
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
});

const outlined = (theme: Theme) => ({
  th: {
    border: `solid 1px #e5e7eb`,
    borderStyle: 'solid none',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800],

    '&:first-child': {
      borderTopLeftRadius: '10px',
      borderLeftStyle: 'solid',
    },
    '&:last-child': {
      borderTopRightRadius: '10px',
      borderRightStyle: 'solid',
    },
  },
  td: {
    '&:first-child': {
      borderLeft: 'solid 1px #e5e7eb',
    },
    '&:last-child': {
      borderRight: 'solid 1px #e5e7eb',
    },
  },
});

const variantSettings = (variant: TableProps['variant'], theme: Theme) => {
  if (variant === 'contained') {
    return contained(theme);
  }

  if (variant === 'outlined') {
    return outlined(theme);
  }
};

export const Table = styled(MuiTable)<TableProps>(({ theme, variant }) => {
  return {
    borderCollapse: 'separate',
    ...variantSettings(variant, theme),
  };
});

export const IconContainer = styled(Box)(() => ({
  display: 'flex',
  marginRight: '8px',
  marginLeft: '-4px',
}));
