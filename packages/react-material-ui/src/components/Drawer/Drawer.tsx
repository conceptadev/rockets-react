import React, { FC, useState, useCallback } from 'react';
import { Drawer as CustomDrawer } from './Styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DrawerItem, { DrawerItemProps } from './DrawerItem';
import Image from '../Image';
import Text from '../Text';
import Box from '../Box';

type Props = {
  items: DrawerItemProps[];
  currentId: string;
  toggleMobileDrawer: () => void;
  mobileIsOpen: boolean;
  logo?: string;
};

const Drawer: FC<Props> = (props) => {
  const { items, currentId, logo, toggleMobileDrawer, mobileIsOpen } = props;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleDrawer = () => {
    setCollapsed((prev) => !prev);
  };

  const drawer = useCallback(
    (hideToggle?: boolean) => (
      <Box display="flex" flexDirection="column">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '20px 16px 17px !important',
          }}
        >
          {logo && <Image src={logo} alt="Logo" />}
        </Toolbar>

        {items.map((item) => (
          <DrawerItem
            key={item.id}
            {...item}
            collapsed={!mobileIsOpen && collapsed}
            active={item.id === currentId}
          />
        ))}

        {!hideToggle && (
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <Text color="primary.contrastText">
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </Text>
            </IconButton>
          </Toolbar>
        )}
      </Box>
    ),
    [collapsed, mobileIsOpen],
  );

  return (
    <>
      <CustomDrawer
        variant="temporary"
        open={mobileIsOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer(true)}
      </CustomDrawer>
      <CustomDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        open={!collapsed}
      >
        {drawer()}
      </CustomDrawer>
    </>
  );
};

export default Drawer;
