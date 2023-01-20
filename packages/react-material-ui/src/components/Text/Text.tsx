import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { TextProps } from 'interfaces';

interface Props {
  textProps?: TextProps;
}

const Text: FC<TypographyProps & Props> = (props) => {
  const { children, textAlign, textProps } = props;

  const {
    fontFamily = 'Inter',
    fontSize,
    fontWeight = '300',
    color,
  } = textProps || {};

  return (
    <Typography
      {...props}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      fontSize={fontSize}
      color={color}
      textAlign={textAlign}
    >
      {children}
    </Typography>
  );
};

export default Text;
