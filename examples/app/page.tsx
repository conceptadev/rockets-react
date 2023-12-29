'use client';

import { Container, Box } from '@mui/material';

import FormsGrid from './forms';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '48px 0' }}>
      <Box sx={{ marginBottom: '32px' }}>
        <h1>Examples</h1>
      </Box>
      <FormsGrid />
    </Container>
  );
};

export default Home;
