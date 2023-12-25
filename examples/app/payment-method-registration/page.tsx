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

export interface PaymentMethodRegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: number | null;
  state: number | null;
  zipCode: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

export const schema: RJSFSchema = {
  type: 'object',
  required: [
    'fullName',
    'email',
    'phone',
    'address',
    'city',
    'state',
    'zipCode',
    'expirationDate',
    'cvc',
  ],
  properties: {
    fullName: { type: 'string', title: 'Full name', minLength: 3 },
    email: { type: 'string', title: 'Email', minLength: 3 },
    phone: { type: 'string', title: 'Phone', minLength: 3 },
    address: { type: 'string', title: 'Address', minLength: 3 },
    city: { type: 'string', title: 'City', minLength: 3 },
    state: { type: 'string', title: 'State', minLength: 3 },
    zipCode: { type: 'string', title: 'Zip code', minLength: 3 },
    cardNumber: { type: 'string', title: 'Card number', minLength: 3 },
    expirationDate: { type: 'string', title: 'Expiration date', minLength: 3 },
    cvc: { type: 'string', title: 'CVC', minLength: 3 },
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

const PaymentMethodRegistration = () => {
  const [formData, setFormData] = useState<PaymentMethodRegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: null,
    state: null,
    zipCode: '',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  });

  const handleSubmit = async (values: PaymentMethodRegistrationFormData) => {
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
        Payment method registration
      </Text>

      <Card sx={{ marginTop: '26px', padding: '24px' }}>
        <SchemaForm.Form
          schema={schema}
          formData={formData}
          onChange={({ formData }) => {
            setFormData(formData);
          }}
          onSubmit={({ formData }) =>
            handleSubmit(formData as PaymentMethodRegistrationFormData)
          }
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
              Submit
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default PaymentMethodRegistration;
