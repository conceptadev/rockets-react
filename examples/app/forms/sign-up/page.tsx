'use client';

import type { IChangeEvent } from '@rjsf/core';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Box, Container, Card, Button, CircularProgress } from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import {
  type SignUpFormData,
  schema,
  advancedProperties,
  widgets,
} from './constants';

const uri = '/api/sign-up';

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    acceptEmailNewsletter: true,
  });

  const { post } = useDataProvider();

  const { execute: signUp, isPending } = useQuery(
    (body) => post({ uri, body }),
    false,
  );

  const handleSubmit = async (values: IChangeEvent<SignUpFormData>) => {
    await signUp(values.formData);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Sign up</h1>
      <Card sx={{ marginTop: '48px', padding: '24px' }}>
        <SchemaForm.Form
          schema={schema}
          formData={formData}
          onChange={({ formData }) => {
            setFormData(formData);
          }}
          onSubmit={handleSubmit}
          widgets={widgets}
          noHtml5Validate={true}
          showErrorList={false}
          advancedProperties={advancedProperties}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={false}
              sx={{ flex: 1 }}
            >
              {isPending ? (
                <CircularProgress sx={{ color: 'white' }} size={24} />
              ) : (
                'Send'
              )}
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default SignUp;
