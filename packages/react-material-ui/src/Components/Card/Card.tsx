import React, { FC } from 'react';
import MuiCard, { CardProps } from '@mui/material/Card';

const Card: FC<CardProps> = (props) => {
  const { children } = props;

  return <MuiCard {...props}>{children}</MuiCard>;
};

export default Card;
