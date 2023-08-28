import React, { FC, useState, useCallback, useEffect } from 'react';
import { StyledDrawer, StyledDrawerProps } from './Styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DrawerItem, { DrawerItemProps } from './DrawerItem';
import Image from '../Image';
import Text from '../Text';
import Box from '@mui/material/Box';
import { TextProps } from 'interfaces';
import { SxProps, Theme } from '@mui/material/styles';

export type DrawerProps = {
  items: DrawerItemProps[];
  currentId?: string;
  toggleMobileDrawer: () => void;
  mobileIsOpen: boolean;
  logo?: string;
  textProps?: TextProps;
  sx?: StyledDrawerProps['sx'];
  buttonSx?: SxProps<Theme>;
  horizontal?: boolean;
  collapsable?: boolean;
  collapsed?: boolean;
  backgroundColor?: StyledDrawerProps['backgroundColor'];
  iconColor?: DrawerItemProps['iconColor'];
  activeIconColor?: DrawerItemProps['activeIconColor'];
};

const Drawer: FC<DrawerProps> = (props) => {
  const {
    items,
    currentId,
    logo,
    toggleMobileDrawer,
    mobileIsOpen,
    textProps,
    sx,
    buttonSx,
    horizontal,
    collapsable = true,
    collapsed = false,
    backgroundColor,
    iconColor,
    activeIconColor,
  } = props;

  const [_collapsed, _setCollapsed] = useState<boolean>(collapsed);

  useEffect(() => {
    _setCollapsed(collapsed);
  }, [collapsed]);

  const toggleDrawer = () => {
    _setCollapsed((prev) => !prev);
  };

  const drawerContent = useCallback(
    (hideToggle?: boolean) => (
      <Box display="flex" flexDirection="column" sx={sx}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: horizontal ? 'start' : 'center',
            p: '20px 16px 17px !important',
          }}
        >
          {logo && <Image src={logo} alt="Logo" />}
        </Toolbar>

        {items.map((item, i) => {
          if (item.component) return item.component;

          return (
            <DrawerItem
              key={item.id || i}
              {...item}
              collapsed={!mobileIsOpen && _collapsed}
              active={!!currentId && item.id === currentId}
              textProps={textProps}
              sx={buttonSx}
              horizontal={horizontal}
              iconColor={iconColor}
              activeIconColor={activeIconColor}
            />
          );
        })}

        {!hideToggle && collapsable && (
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
                {_collapsed ? <ChevronRight /> : <ChevronLeft />}
              </Text>
            </IconButton>
          </Toolbar>
        )}
      </Box>
    ),
    [_collapsed, mobileIsOpen],
  );

  return (
    <>
      <StyledDrawer
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
        horizontal={horizontal}
        backgroundColor={backgroundColor}
      >
        {drawerContent(true)}
      </StyledDrawer>
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        open={!_collapsed}
        horizontal={horizontal}
        backgroundColor={backgroundColor}
      >
        {drawerContent()}
      </StyledDrawer>
    </>
  );
};

export default Drawer;
