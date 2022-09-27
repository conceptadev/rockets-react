import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Navbar from '../Navbar';

type Props = {
  drawer: ReactNode;
  children: ReactNode;
};

const ContainerWithDrawer: FC<Props> = ({ drawer, children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {drawer}

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default ContainerWithDrawer;
