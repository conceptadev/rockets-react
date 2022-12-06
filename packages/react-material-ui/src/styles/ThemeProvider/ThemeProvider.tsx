import React, { FC } from 'react';
import MuiThemeProvider, {
  ThemeProviderProps,
} from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  return (
    <MuiThemeProvider {...props}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
