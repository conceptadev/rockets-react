import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

export const Navbar = styled(MuiAppBar)(({ theme }) => ({
  position: 'relative',
  ...(theme.palette.mode === 'light' && {
    backgroundColor: theme.palette.common.white,
  }),
}));

export const Toolbar = styled(MuiToolbar)(() => ({
  display: 'flex',
}));
