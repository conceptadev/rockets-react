'use client';

import { Container, Box, Grid, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  height: '200px',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: 'flex',
}));

const ItemContent = styled(Link)(({ theme }) => ({
  marginTop: 'auto',
  textDecoration: 'none',
  color: 'black',
  fontWeight: theme.typography.fontWeightBold,
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: 18,
}));

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '48px 0' }}>
      <h2>Examples</h2>
      <Box sx={{ padding: '32px 0' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <ItemContent href="/login">Login</ItemContent>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <ItemContent href="/sign-up">Sign up</ItemContent>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <ItemContent href="/feedback">Feedback</ItemContent>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <ItemContent href="/payment-method-registration">
                Payment method registration
              </ItemContent>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <ItemContent href="/autocomplete">Autocomplete</ItemContent>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
