import React, { FC } from 'react';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';

const IconButton: FC<IconButtonProps> = (props) => {
  const { children } = props;

  return <MuiIconButton {...props}>{children}</MuiIconButton>;
};

export default IconButton;
