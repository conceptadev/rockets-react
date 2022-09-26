import React, { FC } from 'react';
import MuiDivider, { DividerProps } from '@mui/material/Divider';

const Divider: FC<DividerProps> = (props) => {
  const { children } = props;

  if (!children) return <MuiDivider />;

  return <MuiDivider>{children}</MuiDivider>;
};

export default Divider;
