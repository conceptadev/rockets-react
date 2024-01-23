import React from 'react';
import MuiLink, { LinkProps } from '@mui/material/Link';

const Link = (props: LinkProps) => {
  const { children, color = 'primary.dark', sx } = props;

  return (
    <MuiLink
      color={color}
      {...props}
      sx={[
        {
          textDecoration: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
