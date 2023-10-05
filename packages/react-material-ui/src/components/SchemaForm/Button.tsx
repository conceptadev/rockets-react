import React, { PropsWithChildren } from 'react';
import MUIButton from '@mui/material/Button';

const Button = ({ children }: PropsWithChildren) => (
  <MUIButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
    {children}
  </MUIButton>
);

export default Button;
