import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

const Text: FC<TypographyProps> = (props) => {
  const { children, fontWeight = '300' } = props;

  return (
    <Typography fontWeight={fontWeight} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
