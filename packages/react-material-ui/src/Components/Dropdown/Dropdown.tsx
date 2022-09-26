import React, { FC, ReactNode, useState, MouseEvent, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '../Box';
import {
  RowsProps,
  SimpleOptionButton,
  CustomRowOptionsProps,
} from '../Table/Table';

type Props = {
  row: RowsProps;
  customRowOptions?:
    | SimpleOptionButton[]
    | (({ row, close }: CustomRowOptionsProps) => ReactNode);
};

const FadeMenu: FC<Props> = ({ row, customRowOptions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!customRowOptions) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Box display="flex">
          {customRowOptions.map((item) => (
            <Box
              sx={{ cursor: 'pointer', px: 1 }}
              onClick={handleCustomItemClick(item)}
              key={item.key}
              display="flex"
            >
              {item.renderItem}
            </Box>
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
          <MoreHorizIcon />
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

export default FadeMenu;
