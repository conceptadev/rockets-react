import React, { FC } from 'react';
import { Navbar as CustomNavbar, Toolbar } from './Styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '../Box';
import Notifications from '../Notifications';
import HeaderAccount from '../HeaderAccount';
import Text from '../Text';

type Props = {
  drawerToggle?: () => void;
};

const Navbar: FC<Props> = ({ drawerToggle }) => {
  return (
    <CustomNavbar>
      <Toolbar>
        <Text color="text.primary">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={drawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Text>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Notifications amount={4} />
          <HeaderAccount
            avatar="https://source.unsplash.com/random"
            text="John Smith"
            subText="Amazing Inc."
          />
        </Box>
      </Toolbar>
    </CustomNavbar>
  );
};

export default Navbar;
