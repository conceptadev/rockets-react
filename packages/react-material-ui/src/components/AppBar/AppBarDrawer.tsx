import React from 'react';
import { Drawer, DrawerProps } from '../Drawer';
import { useAppBarRoot } from './hooks/useAppBarRoot';

/**
 * The list of the app routes rendered as a vertical navigation list on the Drawer component.
 *
 * @see {@link AppBar}
 * @see {@link Drawer}
 * @param props - {@link DrawerProps}
 */
export const AppBarDrawer = (props: DrawerProps) => {
  const { isMobileOpen, toggleMobileOpen } = useAppBarRoot();

  return (
    <Drawer
      mobileIsOpen={isMobileOpen}
      onMobileClose={toggleMobileOpen}
      {...props}
    />
  );
};
