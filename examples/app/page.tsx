'use client';

import { Box } from '@mui/material';
import { Link } from '@concepta/react-material-ui';

const Home = () => {
  return (
    <Box>
      <h2>Examples</h2>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign up</Link>
        </li>
        <li>
          <Link href="/feedback">Feedback</Link>
        </li>
        <li>
          <Link href="/payment-method-registration">
            Payment method registration
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export default Home;
