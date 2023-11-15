import React, { FC, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Drawer, { DrawerProps } from '../Drawer';
import { DrawerItemProps } from '../Drawer/DrawerItem';
import Navbar, { NavbarProps } from '../Navbar';
import { TypographyProps } from '@mui/material/Typography';
import { TextProps } from 'interfaces';

export type ContainerWithDrawerProps = {
  children: ReactNode;
  currentId?: string;
  logo?: DrawerProps['logo'];
  containerProps?: ContainerProps;
  drawerTextProps?: TextProps;
  drawerItems: DrawerItemProps[];
  drawerHorizontal?: boolean;
  drawerBackgroundColor?: DrawerProps['backgroundColor'];
  drawerCustomToggle?: DrawerProps['customToggle'];
  drawerCollapsedWidth?: DrawerProps['collapsedWidth'];
  drawerExpandedWidth?: DrawerProps['expandedWidth'];
  collapsable?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  iconColor?: DrawerItemProps['iconColor'];
  activeIconColor?: DrawerItemProps['activeIconColor'];
  showNotifications?: NavbarProps['showNotifications'];
  notificationsNumber?: NavbarProps['notificationsNumber'];
  notificationsOnClick?: NavbarProps['notificationsOnClick'];
  headerAvatar?: NavbarProps['avatar'];
  headerText?: NavbarProps['text'];
  headerSubText?: NavbarProps['subText'];
  fontFamily?: TypographyProps['fontFamily'];
  fontSize?: TypographyProps['fontSize'];
  fontWeight?: TypographyProps['fontWeight'];
  color?: TypographyProps['color'];
  headerMenuOptions?: NavbarProps['headerMenuOptions'];
  headerSx?: NavbarProps['sx'];
  backgroundColor?: string;
  customNavbar?: (toggleMobileDrawer: () => void) => ReactNode;
};

const ContainerWithDrawer: FC<ContainerWithDrawerProps> = ({
  children,
  currentId,
  logo,
  containerProps,
  drawerTextProps,
  drawerItems,
  drawerHorizontal,
  drawerBackgroundColor,
  drawerCustomToggle,
  collapsable,
  collapsed,
  onCollapsedChange,
  iconColor,
  activeIconColor,
  showNotifications,
  notificationsNumber,
  notificationsOnClick,
  headerAvatar,
  headerText,
  headerSubText,
  headerMenuOptions,
  headerSx,
  backgroundColor,
  customNavbar,
  drawerCollapsedWidth,
  drawerExpandedWidth,
}) => {
  const [mobileIsOpen, setMobileIsOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setMobileIsOpen((prv) => !prv);
  };

  return (
    <Box sx={{ display: 'flex' }} id="ContainerWithDrawer">
      <Drawer
        items={drawerItems}
        currentId={currentId}
        mobileIsOpen={mobileIsOpen}
        onMobileClose={toggleMobileDrawer}
        logo={logo}
        textProps={drawerTextProps}
        horizontal={drawerHorizontal}
        collapsable={collapsable}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        backgroundColor={drawerBackgroundColor}
        iconColor={iconColor}
        activeIconColor={activeIconColor}
        customToggle={drawerCustomToggle}
        collapsedWidth={drawerCollapsedWidth}
        expandedWidth={drawerExpandedWidth}
      />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            backgroundColor || theme.palette.background.default,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        {customNavbar ? (
          customNavbar(toggleMobileDrawer)
        ) : (
          <Navbar
            drawerToggle={toggleMobileDrawer}
            showNotifications={showNotifications}
            notificationsNumber={notificationsNumber}
            notificationsOnClick={notificationsOnClick}
            avatar={headerAvatar}
            text={headerText}
            subText={headerSubText}
            headerMenuOptions={headerMenuOptions}
            sx={headerSx}
          />
        )}

        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
          }}
          {...containerProps}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default ContainerWithDrawer;
