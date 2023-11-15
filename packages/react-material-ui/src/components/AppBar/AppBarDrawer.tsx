import React from 'react';
import Drawer, { DrawerProps } from '../Drawer';
import { useAppBarRoot } from './hooks/useAppBarRoot';

const AppBarDrawer = (props: DrawerProps) => {
  const { isMobileOpen, toggleMobileOpen } = useAppBarRoot();

  return (
    <Drawer
      mobileIsOpen={isMobileOpen}
      onMobileClose={toggleMobileOpen}
      {...props}
    />
  );
};

export default AppBarDrawer;
