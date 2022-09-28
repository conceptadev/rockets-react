import React, { FC } from 'react';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';

const MenuItem: FC<MenuItemProps> = (props) => {
  const { children } = props;

  return <MuiMenuItem {...props}>{children}</MuiMenuItem>;
};

export default MenuItem;
