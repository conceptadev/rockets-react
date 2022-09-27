import React, { FC } from 'react';
import MuiContainer, { ContainerProps } from '@mui/material/Container';

const Container: FC<ContainerProps> = (props) => {
  const { children } = props;

  return <MuiContainer {...props}>{children}</MuiContainer>;
};

export default Container;
