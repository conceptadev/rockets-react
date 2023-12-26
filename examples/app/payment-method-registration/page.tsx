'use client';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Box, Container, Card, Button } from '@mui/material';

import {
  type PaymentMethodRegistrationFormData,
  schema,
  advancedProperties,
  widgets,
  uiSchema,
} from './constants';

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
    saveAsDefault: true,
  });

  const handleSubmit = async (values: PaymentMethodRegistrationFormData) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Payment method registration</h1>

      <Card sx={{ marginTop: '48px', padding: '24px' }}>
        <SchemaForm.Form
          schema={schema}
          uiSchema={uiSchema}
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
