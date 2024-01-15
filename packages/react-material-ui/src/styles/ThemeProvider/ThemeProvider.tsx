import React from 'react';
import MuiThemeProvider, {
  ThemeProviderProps,
} from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeProvider = (props: ThemeProviderProps) => {
  return (
    <MuiThemeProvider {...props}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
