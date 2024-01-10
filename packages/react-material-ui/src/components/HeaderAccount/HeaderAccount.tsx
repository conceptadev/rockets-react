import React, { useState, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Text from '../Text';
import Avatar from '../Avatar';
import { TextProps } from 'interfaces';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

export type HeaderAccountProps = {
  avatar?: string;
  avatarSize?: number;
  text?: string;
  subText?: string;
  onClick?: () => void;
  textProps?: TextProps;
  subTextProps?: TextProps;
  iconColor?: string;
  menuOptions?: (handleClose: () => void) => ReactNode;
};

const HeaderAccount = ({
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

        <Box display="flex" flexDirection="column">
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

export default HeaderAccount;
