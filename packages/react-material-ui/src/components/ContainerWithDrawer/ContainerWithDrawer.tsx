import React, { FC, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Drawer, { DrawerProps } from '../Drawer';
import { DrawerItemProps } from '../Drawer/DrawerItem';
import Navbar, { NavbarProps } from '../Navbar';
import { TypographyProps } from '@mui/material/Typography';
import { TextProps } from 'interfaces';

export type ContainerWithDrawerProps = {
  children: ReactNode;
  currentId?: string;
  logo?: DrawerProps['logo'];
  drawerTextProps?: TextProps;
  drawerItems: DrawerItemProps[];
  drawerHorizontal?: boolean;
  drawerBackgroundColor?: DrawerProps['backgroundColor'];
  drawerCustomToggle?: DrawerProps['customToggle'];
  drawerCollapsedWidth?: DrawerProps['collapsedWidth'];
  drawerExpandedWidth?: DrawerProps['expandedWidth'];
  collapsed?: boolean;
  collapsable?: boolean;
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
  drawerTextProps,
  drawerItems,
  drawerHorizontal,
  drawerBackgroundColor,
  drawerCustomToggle,
  collapsed,
  collapsable,
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
        logo={logo}
        textProps={drawerTextProps}
        horizontal={drawerHorizontal}
        collapsable={collapsable}
        collapsed={collapsed}
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
        >
          {children}
        </Container>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default ContainerWithDrawer;
