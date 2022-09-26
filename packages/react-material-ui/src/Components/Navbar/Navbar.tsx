import React, { FC } from 'react';
import { Navbar as CustomNavbar, Toolbar } from './Styles';
import Notifications from '../Notifications';
import HeaderAccount from '../HeaderAccount';

const Navbar: FC = () => {
  return (
    <CustomNavbar>
      <Toolbar>
        <Notifications amount={4} />
        <HeaderAccount
          avatar="https://source.unsplash.com/random"
          text="John Smith"
          subText="Amazing Inc."
        />
      </Toolbar>
    </CustomNavbar>
  );
};

export default Navbar;
