import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { darken } from '@mui/material/styles';
import { StyledDrawer, StyledDrawerProps } from './Styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { DrawerItem, DrawerItemProps } from './DrawerItem';
import { Image } from '../Image';
import Box from '@mui/material/Box';
import { TextProps } from '../../interfaces';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Drawer component props.
 */
export type DrawerProps = {
  /** Array of items to display in the drawer */
  items?: DrawerItemProps[];
  /** ID of the currently active item, changing the menu item to active when the page selected corresponds to the path name. */
  currentId?: string;
  /** Custom node that can be rendered on the bottom of the Drawer, serving as toggle for expanded/collapsed state. */
  customToggle?: (toggleDrawer: () => void, collapsed?: boolean) => ReactNode;
  /** Whether the drawer is open on mobile devices */
  mobileIsOpen?: boolean;
  /** Callback function to handle closing the drawer on mobile devices */
  onMobileClose?: () => void;
  /** Logo to display in the drawer header */
  logo?: string | ReactNode | ((collapsed?: boolean) => ReactNode);
  /** Props for text elements inside the drawer */
  textProps?: TextProps;
  /** Custom styles for the drawer, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) */
  sx?: StyledDrawerProps['sx'];
  /** Custom styles for drawer buttons, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern. */
  buttonSx?: SxProps<Theme>;
  /** Whether the drawer items should be displayed horizontally */
  horizontal?: boolean;
  /** Whether the drawer is collapsible */
  collapsible?: boolean;
  /** Icon to use for the collapsible button */
  collapsibleIcon?: ReactNode | ((collapsed?: boolean) => ReactNode);
  /** Color of the collapsible icon */
  collapsibleIconColor?: string;
  /** Background color of the collapsible icon */
  collapsibleIconBgColor?: string;
  /** Whether the drawer is collapsed */
  collapsed?: boolean;
  /** Callback function to handle changes to the collapsed state */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Background color of the drawer */
  backgroundColor?: StyledDrawerProps['backgroundColor'];
  /** Color of the drawer item icons */
  iconColor?: DrawerItemProps['iconColor'];
  /** Color of the active drawer item icons */
  activeIconColor?: DrawerItemProps['activeIconColor'];
  /** Width of the drawer when collapsed */
  collapsedWidth?: StyledDrawerProps['collapsedWidth'];
  /** Width of the drawer when expanded */
  expandedWidth?: StyledDrawerProps['expandedWidth'];
};

/**
 * The Drawer component is a sidebar with navigation items.
 * It supports various features such as collapsible sections,
 * custom toggles, and responsive design for mobile devices.
 *
 * @see [Storybook - Drawer](https://storybook.rockets.tools/?path=/docs/drawer)
 *
 * @example
 * ```tsx
 * <Drawer
 *   items={[
 *     { id: 'item1', label: 'Item 1', onClick: () => console.log('Item 1 clicked') },
 *     { id: 'item2', label: 'Item 2', onClick: () => console.log('Item 2 clicked') },
 *   ]}
 *   currentId="item1"
 *   logo="logo.png"
 * />
 * ```
 *
 * @param props - Drawer component props
 */
export const Drawer = (props: DrawerProps) => {
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

  const drawerContent = (hideToggle?: boolean) => (
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

      {items?.map((item, i) => {
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
