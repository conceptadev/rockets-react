'use client';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Box, Container, Card, Button } from '@mui/material';

import {
  type SignUpFormData,
  schema,
  advancedProperties,
  widgets,
} from './constants';

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

  const handleSignUp = async (values: SignUpFormData) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
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
          onSubmit={({ formData }) => handleSignUp(formData as SignUpFormData)}
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
              Send
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default SignUp;
