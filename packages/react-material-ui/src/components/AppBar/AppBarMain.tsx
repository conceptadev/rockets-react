import React from 'react';
import { Box, BoxProps } from '@mui/material';

const AppBarMain = ({ sx, children, ...props }: BoxProps) => {
  return (
    <Box
      component="main"
      sx={[
        {
          backgroundColor: (theme) => theme.palette.background.default,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AppBarMain;
