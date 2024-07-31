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

/**
 * Dropdown item type definition.
 */
export type DropdownItem = {
  /** Unique key for the dropdown item */
  key: string;
  /** Custom `onClick` handler for the dropdown item */
  onClick?: () => void;
  /** Text to display for the dropdown item */
  text?: string;
  /** Icon to display alongside the dropdown item */
  icon?: ReactNode;
  /** Position of the icon relative to the text (left or right) */
  iconPosition?: 'left' | 'right';
};

/**
 * Dropdown component props.
 */
export type DropdownProps = {
  /** List of dropdown items */
  options: DropdownItem[];
  /** Direction of the toggle button (horizontal or vertical) */
  toggleDirection?: 'horizontal' | 'vertical';
  /** Props to pass to the Text component */
  textProps?: TextProps;
};

/**
 * The Dropdown component is a UI element that provides a dropdown menu
 * with customizable options. It supports horizontal or vertical toggle
 * directions, and customization options for each item, including text,
 * icons, and their positions.
 *
 * @see [Storybook - Dropdown](https://storybook.rockets.tools/?path=/docs/dropdown)
 *
 * @example
 * ```tsx
 * <Dropdown
 *   options={[
 *     { key: '1', text: 'Option 1', onClick: () => console.log('Option 1 clicked') },
 *     { key: '2', text: 'Option 2', icon: <SomeIcon />, iconPosition: 'right' },
 *   ]}
 *   toggleDirection="vertical"
 * />
 * ```
 *
 * @param props - Dropdown component props
 */
export const Dropdown = ({
  options,
  toggleDirection = 'horizontal',
  textProps = {
    fontSize: 16,
    fontWeight: 400,
    color: 'text.primary',
  },
}: DropdownProps) => {
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
