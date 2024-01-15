import React, { ReactNode, useState, MouseEvent, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import { IconContainer } from './Styles';
import MenuItem from '@mui/material/MenuItem';
import Text from '../Text';
import { TextProps } from 'interfaces';

export type DropdownItem = {
  key: string;
  onClick?: () => void;
  text?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
};

type Props = {
  options: DropdownItem[];
  toggleDirection?: 'horizontal' | 'vertical';
  textProps?: TextProps;
};

const Dropdown = ({
  options,
  toggleDirection = 'horizontal',
  textProps = {
    fontSize: 16,
    fontWeight: 400,
    color: 'text.primary',
  },
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleToggleClick = (event: MouseEvent<HTMLElement>) => {
    if (!options) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCustomItemClick = (item: DropdownItem) => () => {
    item.onClick?.();
    handleClose();
  };

  const renderOptions = useMemo(() => {
    if (Array.isArray(options)) {
      return (
        <Box display="flex" flexDirection="column" sx={{ p: 0, m: 0 }}>
          {options.map((item) => {
            const { key, icon, iconPosition = 'left', text } = item;

            const isLeftSide = iconPosition === 'left';

            return (
              <MenuItem key={key} onClick={handleCustomItemClick(item)}>
                <Box
                  display="flex"
                  flexDirection={
                    iconPosition === 'left' ? 'row' : 'row-reverse'
                  }
                >
                  {icon && (
                    <IconContainer isLeftSide={isLeftSide}>
                      {icon}
                    </IconContainer>
                  )}
                  <Text {...textProps}>{text}</Text>
                </Box>
              </MenuItem>
            );
          })}
        </Box>
      );
    }

    return;
  }, [options]);

  return (
    <>
      <Tooltip title="Options">
        <IconButton
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleToggleClick}
          data-testid="toggle-button"
        >
          {toggleDirection === 'horizontal' ? (
            <MoreHorizIcon data-testid="toggle-icon" />
          ) : (
            <MoreVertIcon data-testid="toggle-icon" />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {renderOptions}
      </Menu>
    </>
  );
};

export default Dropdown;
