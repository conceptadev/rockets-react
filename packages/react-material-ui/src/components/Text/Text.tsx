import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

const Text = (props: TypographyProps) => {
  const { children, fontWeight = '300' } = props;

  return (
    <Typography fontWeight={fontWeight} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
