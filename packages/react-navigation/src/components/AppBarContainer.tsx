import React, { type ReactNode, startTransition } from 'react';
import { useAuth } from '@concepta/react-auth-provider';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  DrawerItemProps,
  DrawerProps,
  NavbarProps,
} from '@concepta/react-material-ui';

type AppBarContainer = {
  children: ReactNode;
  menuItems: DrawerItemProps[];
  drawerProps?: DrawerProps;
  navbarProps?: NavbarProps;
};

export default function AppBarContainer({
  children,
  menuItems,
  drawerProps,
  navbarProps,
}: AppBarContainer) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, doLogout } = useAuth();

  const onLogoutClick = (handleCloseMenu: () => void) => {
    handleCloseMenu();
    doLogout();
    startTransition(() => navigate('/sign-in'));
  };

  const drawerItems = drawerProps?.items
    ? [...menuItems, ...drawerProps.items]
    : menuItems;

  return (
    <AppBar.Root key={location.pathname}>
      <AppBar.Drawer
        currentId={location.pathname}
        logo="/logo.svg"
        collapsible
        expandedWidth={120}
        {...drawerProps}
        items={drawerItems}
      />
      <AppBar.Main>
        <AppBar.Nav
          text={(user as any)?.username || ''}
          headerMenuOptions={(handleClose) => (
            <MenuItem onClick={() => onLogoutClick(handleClose)}>
              Sign Out
            </MenuItem>
          )}
          {...navbarProps}
        />
        <Container>{children}</Container>
      </AppBar.Main>
    </AppBar.Root>
  );
}
