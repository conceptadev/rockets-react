import React, { FC } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

const Button: FC<ButtonProps> = (props) => {
  const { children } = props;

  return (
    <MuiButton {...props} sx={{ ...props.sx, textTransform: 'none' }}>
      {children}
    </MuiButton>
  );
};

export default Button;
