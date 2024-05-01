import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { darken } from '@mui/material/styles';
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
  customToggle?: (toggleDrawer: () => void, collapsed?: boolean) => ReactNode;
  mobileIsOpen?: boolean;
  onMobileClose?: () => void;
  logo?: string | ReactNode | ((collapsed?: boolean) => ReactNode);
  textProps?: TextProps;
  sx?: StyledDrawerProps['sx'];
  buttonSx?: SxProps<Theme>;
  horizontal?: boolean;
  collapsible?: boolean;
  collapsibleIcon?: ReactNode | ((collapsed?: boolean) => ReactNode);
  collapsibleIconColor?: string;
  collapsibleIconBgColor?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  backgroundColor?: StyledDrawerProps['backgroundColor'];
  iconColor?: DrawerItemProps['iconColor'];
  activeIconColor?: DrawerItemProps['activeIconColor'];
  collapsedWidth?: StyledDrawerProps['collapsedWidth'];
  expandedWidth?: StyledDrawerProps['expandedWidth'];
};

const Drawer = (props: DrawerProps) => {
  const {
    items,
    currentId,
    logo,
    customToggle,
    mobileIsOpen,
    onMobileClose,
    textProps,
    sx,
    buttonSx,
    horizontal,
    collapsible = true,
    collapsibleIcon,
    collapsibleIconColor,
    collapsibleIconBgColor,
    collapsed = false,
    onCollapsedChange,
    backgroundColor,
    iconColor,
    activeIconColor,
    collapsedWidth,
    expandedWidth,
  } = props;
  const [_collapsed, _setCollapsed] = useState<boolean>(collapsed);

  useEffect(() => {
    _setCollapsed(collapsed);
  }, [collapsed]);

  const toggleDrawer = () => {
    const newCollapsedValue = !_collapsed;
    _setCollapsed(newCollapsedValue);
    onCollapsedChange?.(newCollapsedValue);
  };

  const renderLogo = useCallback(() => {
    if (typeof logo === 'string') return <Image src={logo} alt="Logo" />;
    if (typeof logo === 'function') return logo(_collapsed);

    return logo;
  }, [logo, _collapsed]);

  const drawerContent = useCallback(
    (hideToggle?: boolean) => (
      <Box display="flex" flexDirection="column" sx={sx} flex={1}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: horizontal ? 'start' : 'center',
            p: '20px 16px 17px !important',
          }}
        >
          {renderLogo()}
        </Toolbar>

        {items.map((item, i) => {
          const isActive = !!currentId && currentId.startsWith(item.id);
          if (item.component)
            return (
              <Box onClick={item.onClick} className={isActive ? 'active' : ''}>
                {typeof item.component === 'function'
                  ? item.component(
                      !!currentId && currentId.startsWith(item.id),
                      _collapsed,
                    )
                  : item.component}
              </Box>
            );

          return (
            <DrawerItem
              key={item.id || i}
              {...item}
              collapsed={!mobileIsOpen && _collapsed}
              active={isActive}
              textProps={textProps}
              sx={[buttonSx, ...(Array.isArray(sx) ? sx : [sx])]}
              horizontal={item.horizontal || horizontal}
              iconColor={iconColor}
              activeIconColor={activeIconColor}
              temporary={hideToggle}
            />
          );
        })}

        {!hideToggle &&
          collapsible &&
          !!customToggle &&
          customToggle(toggleDrawer, _collapsed)}

        {!hideToggle && collapsible && !customToggle && (
          <Toolbar
            sx={{
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton
              className="Rockets-CollapsibleButton"
              onClick={toggleDrawer}
              sx={{
                color: collapsibleIconColor || 'primary.contrastText',
                backgroundColor: collapsibleIconBgColor || 'transparent',
                ...(collapsibleIconBgColor && {
                  '&:hover': {
                    backgroundColor: darken(collapsibleIconBgColor, 0.1),
                  },
                }),
              }}
            >
              {collapsibleIcon &&
                typeof collapsibleIcon === 'function' &&
                collapsibleIcon(_collapsed)}

              {collapsibleIcon &&
                typeof collapsibleIcon != 'function' &&
                collapsibleIcon}

              {!collapsibleIcon &&
                (_collapsed ? <ChevronRight /> : <ChevronLeft />)}
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
        className="Rockets-Drawer Rockets-Drawer-temporary"
        open={mobileIsOpen}
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
        collapsedWidth={collapsedWidth}
        expandedWidth={expandedWidth}
        onClose={onMobileClose}
      >
        {drawerContent(true)}
      </StyledDrawer>
      <StyledDrawer
        variant="permanent"
        className="Rockets-Drawer Rockets-Drawer-permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        open={!_collapsed}
        horizontal={horizontal}
        backgroundColor={backgroundColor}
        collapsedWidth={collapsedWidth}
        expandedWidth={expandedWidth}
        data-testid="drawer"
      >
        {drawerContent()}
      </StyledDrawer>
    </>
  );
};

export default Drawer;
