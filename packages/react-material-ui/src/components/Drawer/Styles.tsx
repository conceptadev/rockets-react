import MuiDrawer from '@mui/material/Drawer';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

export type StyledDrawerProps = {
  sx?: SxProps<Theme>;
  horizontal?: boolean;
  backgroundColor?: string;
  collapsedWidth?: string | number;
  expandedWidth?: string | number;
};

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    !['backgroundColor', 'collapsedWidth', 'expandedWidth'].some(
      (propName) => propName === prop,
    ),
})<StyledDrawerProps>(
  ({
    theme,
    open,
    sx,
    horizontal,
    backgroundColor,
    collapsedWidth,
    expandedWidth,
  }) => [
    {
      '& .MuiDrawer-paper': {
        backgroundColor: backgroundColor || theme.palette.primary.dark,
        position: 'relative',
        whiteSpace: 'nowrap',
        width: expandedWidth || (horizontal ? 256 : 120),
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
          width: collapsedWidth || theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: collapsedWidth || theme.spacing(9),
          },
        }),
      },
    },
    ...(Array.isArray(sx) ? sx : [sx]),
  ],
);

export type DrawerButtonProps = {
  active?: boolean;
  collapsed?: boolean;
  sx?: SxProps<Theme>;
  horizontal?: boolean;
  iconColor?: string;
  activeIconColor?: string;
};

export const DrawerButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    !['active', 'collapsed', 'iconColor', 'activeIconColor'].some(
      (propName) => propName === prop,
    ),
})<DrawerButtonProps>(
  ({
    theme,
    active,
    collapsed,
    sx,
    horizontal,
    iconColor,
    activeIconColor,
  }) => {
    let _iconColor = iconColor || alpha(theme.palette.common.white, 0.65);

    if (active) {
      _iconColor = activeIconColor || theme.palette.common.white;
    }

    const paddingBottom = () => {
      if (horizontal) {
        return '8px';
      }
      if (collapsed) {
        return '6px';
      }
      return '18px';
    };

    return [
      {
        color: active
          ? theme.palette.common.white
          : alpha(theme.palette.common.white, 0.85),
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        justifyContent: 'start',
        alignItems: 'center',
        whiteSpace: horizontal ? 'nowrap' : 'break-spaces',
        margin: '2px 8px',
        paddingX: '8px',
        paddingTop: '8px',
        paddingBottom: paddingBottom(),
        minWidth: 0,
        overflow: 'hidden',
        textTransform: 'none',
        textAlign: 'left',
        maxHeight: collapsed ? '40px' : '85px',
        transition: 'max-height 300ms, padding-bottom 300ms',
        backgroundColor: active
          ? alpha(theme.palette.common.black, 0.2)
          : 'transparent',
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.black, 0.2),
        },
        '& svg': {
          color: _iconColor,
          marginRight: !collapsed && horizontal ? 12 : 0,
          marginBottom: !collapsed && !horizontal ? 6 : 0,
          transform: `translateX(${collapsed && horizontal ? '8px' : 0})`,
          transition: 'all 300ms',
        },
        '& p': {
          opacity: collapsed ? 0 : 1,
          transition: 'opacity 300ms',
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ];
  },
);
