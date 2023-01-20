import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

const Text: FC<TypographyProps> = (props) => {
  const { children, fontFamily = 'Inter', fontWeight = '300' } = props;

  return (
    <Typography {...props} fontFamily={fontFamily} fontWeight={fontWeight}>
      {children}
    </Typography>
  );
};

export default Text;
