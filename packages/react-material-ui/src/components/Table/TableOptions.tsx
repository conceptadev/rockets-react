'use client';

import React, { ReactNode, useState, MouseEvent, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

import { IconContainer } from './styles';
import MenuItem from '@mui/material/MenuItem';
import { CustomRowOptionsProps, RowProps, SimpleOptionButton } from './types';

type TableOptionsProps = {
  row: RowProps;
  customRowOptions?:
    | SimpleOptionButton[]
    | (({ row, close }: CustomRowOptionsProps) => ReactNode);
  toggleDirection?: 'horizontal' | 'vertical';
};

/**
 * Represents a component for rendering options for a table row.
 *
 * @param {TableOptionsProps} props - The props for the TableOptions component.
 * @returns A React element representing the table row options.
 */
const TableOptions = ({
  row,
  customRowOptions,
  toggleDirection = 'horizontal',
}: TableOptionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * Handles the click event to open the options menu.
   *
   * @param event - The mouse event triggering the menu opening.
   */
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!customRowOptions) return;
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the closure of the options menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles a custom option item click.
   *
   * @param item - The clicked custom option item.
   * @returns {void} - This function doesn't return anything.
   */
  const handleCustomItemClick = (item: SimpleOptionButton) => () => {
    item.onClick(row);
    handleClose();
  };

  const renderOptions = useMemo(() => {
    if (typeof customRowOptions === 'function') {
      return customRowOptions({ row, close: handleClose });
    }

    if (Array.isArray(customRowOptions)) {
      return (
        <Box display="flex" flexDirection="column" sx={{ p: 0, m: 0 }}>
          {customRowOptions.map((item) => (
            <MenuItem key={item.key} onClick={handleCustomItemClick(item)}>
              {item.icon && <IconContainer>{item.icon}</IconContainer>}
              {item.text}
            </MenuItem>
          ))}
        </Box>
      );
    }

    return;
  }, [customRowOptions]);

  return (
    <>
      <Tooltip title="Options">
        <IconButton
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {toggleDirection === 'horizontal' ? (
            <MoreHorizIcon />
          ) : (
            <MoreVertIcon />
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

export default TableOptions;
