import React from 'react';
import { Navbar, NavbarProps } from '../Navbar';
import { useAppBarRoot } from './hooks/useAppBarRoot';

/**
 * The AppBarNav component renders the user info ({@link Avatar} and Name) and
 * a list of actions related to user and auth, such as Logout.
 *
 * @see {@link AppBar}
 * @see {@link Navbar}
 * @param props - {@link NavbarProps}
 */
export const AppBarNav = (props: NavbarProps) => {
  const { toggleMobileOpen } = useAppBarRoot();

  return <Navbar drawerToggle={toggleMobileOpen} {...props} />;
};
