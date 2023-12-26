'use client';

import type { RJSFSchema } from '@rjsf/utils';

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
  saveAsDefault: boolean;
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
    email: { type: 'string', title: 'Email', format: 'email' },
    phone: { type: 'string', title: 'Phone', minLength: 3 },
    address: { type: 'string', title: 'Address', minLength: 3 },
    city: { type: 'string', title: 'City' },
    state: { type: 'string', title: 'State' },
    zipCode: { type: 'string', title: 'Zip code', minLength: 5 },
    cardNumber: { type: 'string', title: 'Card number', minLength: 3 },
    expirationDate: { type: 'string', title: 'Expiration date', minLength: 4 },
    cvc: { type: 'string', title: 'CVC', minLength: 3 },
    saveAsDefault: { type: 'boolean', title: 'Save as default payment method' },
  },
};

export const advancedProperties: Record<string, AdvancedProperty> = {
  email: {
    type: 'string',
  },
  saveAsDefault: {
    type: 'switch;',
  },
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
  EmailWidget: CustomEmailFieldWidget,
};
