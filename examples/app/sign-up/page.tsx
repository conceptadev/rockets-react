'use client';

import type { RJSFSchema } from '@rjsf/utils';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Text } from '@concepta/react-material-ui';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import {
  CustomTextFieldWidget,
  CustomEmailFieldWidget,
} from '@concepta/react-material-ui/dist/styles/CustomWidgets';
import { AdvancedProperty } from '@concepta/react-material-ui/dist/components/SchemaForm/types';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  acceptEmailNewsletter: boolean;
}

export const schema: RJSFSchema = {
  type: 'object',
  required: [
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'passwordConfirmation',
  ],
  properties: {
    firstName: { type: 'string', title: 'First name', minLength: 3 },
    lastName: { type: 'string', title: 'Last name', minLength: 3 },
    email: { type: 'string', title: 'Email', minLength: 3, format: 'email' },
    username: { type: 'string', title: 'Username', minLength: 3 },
    password: { type: 'string', title: 'Password' },
    passwordConfirmation: { type: 'string', title: 'Confirm password' },
    acceptEmailNewsletter: {
      type: 'boolean',
      title: 'Accept email newsletter',
    },
  },
};

export const advancedProperties: Record<string, AdvancedProperty> = {
  email: {
    type: 'string',
  },
  username: {
    type: 'string',
  },
  password: {
    type: 'password',
  },
  passwordConfirmation: {
    type: 'password',
  },
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
  EmailWidget: CustomEmailFieldWidget,
};

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
      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={30}
        fontWeight={800}
        mt={1}
        gutterBottom
      >
        Sign up
      </Text>

      <Card sx={{ marginTop: '26px', padding: '24px' }}>
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
