import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { Notifications } from '../Notifications';
import Text from '../Text';
import HeaderAccount, { HeaderAccountProps } from '../HeaderAccount';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Properties for the Navbar component.
 */
export type NavbarProps = {
  /**
   * Handler for click events on the Menu button.
   */
  drawerToggle?: () => void;
  /**
   * Flag for showing or hiding the notifications indicator.
   */
  showNotifications?: boolean;
  /**
   * Indicator for notifications counter.
   */
  notificationsNumber?: number;
  /**
   * Handler for click events on the notifications indicator.
   */
  notificationsOnClick?: () => void;
  /**
   * Source of the user profile picture.
   */
  avatar?: string;
  /**
   * String that can contain the current user name or username.
   */
  text?: string;
  /**
   * String rendered below the text content.
   */
  subText?: string;
  /**
   * List of menu actions.
   */
  headerMenuOptions?: HeaderAccountProps['menuOptions'];
  /**
   * Object or array containing custom styles, following the sx pattern. @see {@link https://mui.com/system/getting-started/the-sx-prop/}
   */
  sx?: SxProps<Theme>;
};

/**
 * The Navbar component is a UI element used to display a navigation bar
 * that includes a menu icon for drawer toggling, notification icon, and
 * user account information.
 *
 * @example
 * ```tsx
 * <Navbar
 *   showNotifications={true}
 *   notificationsNumber={5}
 *   notificationsOnClick={handleNotificationsClick}
 *   avatar="https://example.com/avatar.jpg"
 *   text="John Doe"
 *   subText="Administrator"
 * />
 * ```
 *
 * @param props - Navbar component props
 */
export const Navbar = ({
  drawerToggle,
  showNotifications,
  notificationsNumber,
  notificationsOnClick,
  avatar,
  text,
  subText,
  headerMenuOptions,
  sx,
}: NavbarProps) => {
  return (
    <Box
      data-testid="navbarContainer"
      sx={[
        (theme) => ({
          position: 'relative',
          padding: '12px 24px',
          ...(theme.palette.mode === 'light' && {
            backgroundColor: theme.palette.common.white,
          }),
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: '0',
            height: '1px',
            background: '#e5e7eb',
            left: '40px',
            right: '40px',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box display="flex">
        {drawerToggle && (
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
        )}
        <Box display="flex" flex={1} justifyContent="flex-end">
          {showNotifications && notificationsNumber && (
            <Notifications
              amount={notificationsNumber}
              onClick={notificationsOnClick}
            />
          )}
          <HeaderAccount
            avatar={avatar}
            text={text}
            subText={subText}
            menuOptions={headerMenuOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};
