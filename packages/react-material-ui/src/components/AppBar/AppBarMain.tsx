import React from 'react';
import { Box, BoxProps } from '@mui/material';

/**
 * The AppBarMain component serves as a wrapper for the navigation bar and page content.
 * 
 * The AppBar.Main props extend from [Material UI's Box](https://mui.com/material-ui/api/box/#props)
 * component props, so every prop is interchangeable between those two.
 * 
 * @see {@link AppBar}
 * @see {@link [MUI Box Component](https://mui.com/material-ui/react-box/)}
 * @param boxProps - MUI {@link [BoxProps](https://mui.com/material-ui/api/box/#props)}
 */
export const AppBarMain = (boxProps: BoxProps) => {
  const { sx, children, ...props } = boxProps;

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
