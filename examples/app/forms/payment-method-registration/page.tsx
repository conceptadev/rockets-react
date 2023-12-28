'use client';

import type { IChangeEvent } from '@rjsf/core';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Box, Container, Card, Button, CircularProgress } from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import {
  type PaymentMethodRegistrationFormData,
  schema,
  advancedProperties,
  widgets,
  uiSchema,
} from './constants';

const uri = '/forms/api/payment-method-registration';

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

  const { post } = useDataProvider();

  const { execute: submitPaymentMethod, isPending: isLoadingSubmit } = useQuery(
    (body) => post({ uri, body }),
    false,
  );

  const handleSubmit = async (
    values: IChangeEvent<PaymentMethodRegistrationFormData>,
  ) => {
    await submitPaymentMethod(values.formData);
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
              {isLoadingSubmit ? (
                <CircularProgress sx={{ color: 'white' }} size={24} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default PaymentMethodRegistration;
