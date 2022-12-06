import React, { FC } from 'react';
import MuiLink, { LinkProps } from '@mui/material/Link';

const Link: FC<LinkProps> = (props) => {
  const { children, color = 'primary.dark' } = props;

  return (
    <MuiLink sx={{ textDecoration: 'none' }} color={color} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
