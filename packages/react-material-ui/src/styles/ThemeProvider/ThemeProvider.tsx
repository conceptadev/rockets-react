import React from 'react';
import MuiThemeProvider, {
  ThemeProviderProps,
} from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

const ThemeProvider = (props: ThemeProviderProps) => {
  return (
    <MuiThemeProvider {...props}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{props.children}</StyledEngineProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
