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
  showNotifications?: boolean;
  notificationsNumber?: number;
  notificationsOnClick?: () => void;
  avatar?: string;
  text?: string;
  subText?: string;
};

const Navbar: FC<Props> = ({
  drawerToggle,
  showNotifications,
  notificationsNumber,
  notificationsOnClick,
  avatar,
  text,
  subText,
}) => {
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
          {showNotifications && (
            <Notifications
              amount={notificationsNumber}
              onClick={notificationsOnClick}
            />
          )}
          <HeaderAccount avatar={avatar} text={text} subText={subText} />
        </Box>
      </Toolbar>
    </CustomNavbar>
  );
};

export default Navbar;
