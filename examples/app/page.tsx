'use client';

import { Container, Box } from '@mui/material';

import { Grid } from '@/shared/components/Grid';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '48px 0' }}>
      <Box sx={{ marginBottom: '32px' }}>
        <h1>Examples</h1>
      </Box>
      <Grid
        title="Forms"
        items={[
          { title: 'Login', href: '/forms/login' },
          { title: 'Sign up', href: '/forms/sign-up' },
          { title: 'Feedback', href: '/forms/feedback' },
          {
            title: 'Payment method registration',
            href: '/forms/payment-method-registration',
          },
          { title: 'Autocomplete', href: '/forms/autocomplete' },
        ]}
      />
    </Container>
  );
};

export default Home;
