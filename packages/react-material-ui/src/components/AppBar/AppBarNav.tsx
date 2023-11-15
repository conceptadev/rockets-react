import React from 'react';
import Navbar, { NavbarProps } from '../Navbar';
import { useAppBarRoot } from './hooks/useAppBarRoot';

const AppBarNav = (props: NavbarProps) => {
  const { toggleMobileOpen } = useAppBarRoot();

  return <Navbar drawerToggle={toggleMobileOpen} {...props} />;
};

export default AppBarNav;
