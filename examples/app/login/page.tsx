'use client';

import type { FormType } from '@concepta/react-material-ui/dist/components/SimpleForm';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Text, SimpleForm } from '@concepta/react-material-ui';

type FormData = {
  name: string;
  email: string;
};

const schema: FormType = {
  submitButtonLabel: 'Send',
  fields: {
    email: {
      type: 'string',
      title: 'Email',
      required: true,
    },
    password: {
      type: 'password',
      title: 'Password',
      required: true,
    },
  },
};

const Login = () => {
  const handleSubmit = (values: FormData) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={24}
        fontWeight={800}
        mt={4}
        gutterBottom
      >
        Sign in
      </Text>

      <Card sx={{ marginTop: '26px', padding: '24px' }}>
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
