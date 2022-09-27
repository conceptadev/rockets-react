import React, { FC } from 'react';
import MuiBox, { BoxProps } from '@mui/material/Box';

const Box: FC<BoxProps> = (props) => {
  const { children } = props;

  return (
    <MuiBox {...props} sx={{ ...props.sx }}>
      {children}
    </MuiBox>
  );
};

export default Box;
