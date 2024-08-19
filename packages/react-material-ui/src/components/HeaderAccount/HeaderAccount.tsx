import React, { useState, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Text from '../Text';
import { Avatar } from '../Avatar';
import { TextProps } from 'interfaces';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

/**
 * Props for the `HeaderAccount` component.
 */
export type HeaderAccountProps = {
  /** URL or path to the avatar image */
  avatar?: string;
  /** Size of the avatar in pixels */
  avatarSize?: number;
  /** Main text displayed in the header account */
  text?: string;
  /** Subtext displayed below the main text */
  subText?: string;
  /** Custom `onClick` handler */
  onClick?: () => void;
  /** Props passed to the main text component */
  textProps?: TextProps;
  /** Props passed to the subtext component */
  subTextProps?: TextProps;
  /** Color of the expand icon */
  iconColor?: string;
  /** Function that returns menu options as React nodes */
  menuOptions?: (handleClose: () => void) => ReactNode;
};

/**
 * The `HeaderAccount` component is used in the application's header to display
 * user information, such as an avatar, main text, subtext, and a dropdown menu with options.
 * It provides customizable styling for the text, avatar, and icon colors.
 *
 * @see [Storybook - HeaderAccount](https://storybook.rockets.tools/?path=/docs/headeraccount)
 *
 * @example
 * ```tsx
 * <HeaderAccount
 *   avatar="https://example.com/avatar.jpg"
 *   avatarSize={40}
 *   text="John Doe"
 *   subText="Admin"
 *   onClick={() => console.log('Avatar clicked')}
 *   iconColor="primary.main"
 *   menuOptions={(handleClose) => (
 *     <>
 *       <MenuItem onClick={handleClose}>Profile</MenuItem>
 *       <MenuItem onClick={handleClose}>Logout</MenuItem>
 *     </>
 *   )}
 * />
 * ```
 *
 * @param props - Header account component props
 */
export const HeaderAccount = ({
  avatar,
  avatarSize = 36,
  text,
  subText,
  onClick,
  textProps = {
    fontSize: 14,
    fontWeight: 500,
    color: 'text.primary',
  },
  subTextProps = {
    fontSize: 12,
    lineHeight: '10px',
    fontWeight: 500,
    color: 'text.secondary',
  },
  iconColor = 'text.primary',
  menuOptions,
}: HeaderAccountProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex">
      <Button
        variant="text"
        aria-label="open navbar menu"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onClick || handleOpenMenuClick}
        sx={{ textTransform: 'none', textAlign: 'left' }}
      >
        {avatar && <Avatar src={avatar} alt="Avatar" size={avatarSize} />}

        <Box display="flex" flexDirection="column" ml={avatar ? 1 : 0}>
          <Box display="flex">
            <Text {...textProps}>{text}</Text>{' '}
            <ExpandMore sx={{ display: 'inline', color: iconColor }} />
          </Box>
          <Text {...subTextProps}>{subText}</Text>
        </Box>
      </Button>
      {menuOptions && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {menuOptions(handleClose)}
        </Menu>
      )}
    </Box>
  );
};
