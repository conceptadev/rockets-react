'use client';

import type { IChangeEvent } from '@rjsf/core';

import { useState } from 'react';
import { Container, Card } from '@mui/material';
import { SimpleForm } from '@concepta/react-material-ui';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import { type FormData, schema } from './constants';

const uri = '/forms/api/login';

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { post } = useDataProvider();

  const { execute: login } = useQuery((body) => post({ uri, body }), false);

  const handleSubmit = async (values: IChangeEvent<FormData>) => {
    setFormData(values.formData as FormData);

    await login(values.formData);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Login</h1>
      <Card sx={{ marginTop: '48px', padding: '24px' }}>
        <SimpleForm
          form={schema}
          initialData={formData}
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
