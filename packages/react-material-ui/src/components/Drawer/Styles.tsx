import MuiDrawer from '@mui/material/Drawer'
import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.system.drawerBg,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 256,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

type DrawerButtonProps = {
  active?: boolean
  collapsed?: boolean
}

export const DrawerButton = styled(MuiButton)<DrawerButtonProps>(
  ({ theme, active, collapsed }) => ({
    color: theme.system.drawerButtonText,
    margin: '2px 8px',
    padding: '8px',
    minWidth: 0,
    textTransform: 'none',
    textAlign: 'left',
    justifyContent: 'start',
    backgroundColor: active ? theme.system.drawerButtonBg : 'transparent',
    '&:hover': {
      backgroundColor: theme.system.drawerButtonBg,
    },
    '& svg': {
      marginRight: collapsed ? 0 : 12,
      transform: `translateX(${collapsed ? '8px' : 0})`,
      transition: 'all 300ms',
    },
    '& p': {
      opacity: collapsed ? 0 : 1,
      transition: 'opacity 300ms',
    },
  }),
)
