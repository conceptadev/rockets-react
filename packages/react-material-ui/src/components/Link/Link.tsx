import React from 'react';
import MuiLink, { LinkProps } from '@mui/material/Link';

const Link = (props: LinkProps) => {
  const { children, color = 'primary.dark' } = props;

  return (
    <MuiLink sx={{ textDecoration: 'none' }} color={color} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
