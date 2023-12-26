'use client';

import { Container, Card } from '@mui/material';
import { SimpleForm } from '@concepta/react-material-ui';

import { type FormData, schema } from './constants';

const Login = () => {
  const handleSubmit = (values: FormData) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Login</h1>
      <Card sx={{ marginTop: '48px', padding: '24px' }}>
        <SimpleForm
          form={schema}
          onSubmit={handleSubmit}
          onError={(err) =>
            // eslint-disable-next-line no-console
            console.log('errors', err)
          }
        />
      </Card>
    </Container>
  );
};

export default Login;
