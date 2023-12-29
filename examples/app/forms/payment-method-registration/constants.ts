'use client';

import type { RJSFSchema, UiSchema } from '@rjsf/utils';

import {
  CustomTextFieldWidget,
  CustomEmailFieldWidget,
  CustomSelectWidget,
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
    'cardNumber',
    'expirationDate',
    'cvc',
  ],
  properties: {
    fullName: { type: 'string', title: 'Full name', minLength: 3 },
    email: { type: 'string', title: 'Email', format: 'email' },
    phone: { type: 'string', title: 'Phone' },
    address: { type: 'string', title: 'Address', minLength: 3 },
    city: {
      title: 'City',
      type: 'number',
      oneOf: [
        {
          const: 1,
          title: 'Orlando',
        },
        {
          const: 2,
          title: 'New York',
        },
        {
          const: 3,
          title: 'Los Angeles',
        },
      ],
    },
    state: {
      title: 'State',
      type: 'number',
      oneOf: [
        {
          const: 1,
          title: 'Florida',
        },
        {
          const: 2,
          title: 'New York',
        },
        {
          const: 3,
          title: 'California',
        },
      ],
    },
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
    type: 'switch',
  },
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
  EmailWidget: CustomEmailFieldWidget,
  SelectWidget: CustomSelectWidget,
};

const getMaskedPhone = (text: string) => {
  const numericInput = text.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 10);
  const phoneNumberFormat = /^(\d{3})?(\d{3})?(\d{0,4})?$/;
  const formattedNumber = truncatedInput.replace(
    phoneNumberFormat,
    (_, p1, p2, p3) => {
      const formattedGroups = [p1 && `(${p1})`, p2 && ` ${p2}`, p3 && `-${p3}`];
      return formattedGroups.filter(Boolean).join('');
    },
  );

  return formattedNumber;
};

const getMaskedZipCode = (value: string) => {
  const numericInput = value.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 5);
  const zipCodeFormat = /^(\d{5})?$/;
  const formattedNumber = truncatedInput.replace(zipCodeFormat, (_, p1) => {
    const formattedGroups = [p1 && `${p1}`];
    return formattedGroups.filter(Boolean).join('');
  });

  return formattedNumber;
};

const getMaskedCardNumber = (value: string) => {
  const numericInput = value.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 16);
  const cardNumberFormat = /^(\d{4})?(\d{4})?(\d{4})?(\d{4})$/;
  const formattedNumber = truncatedInput.replace(
    cardNumberFormat,
    (_, p1, p2, p3, p4) => {
      const formattedGroups = [
        p1 && `${p1}`,
        p2 && `${p2}`,
        p3 && `${p3}`,
        p4 && `${p4}`,
      ];
      return formattedGroups.filter(Boolean).join(' ');
    },
  );

  return formattedNumber;
};

const getMaskedExpirationDate = (value: string) => {
  const numericInput = value.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 4);
  const expirationDateFormat = /^(\d{2})?(\d{2})?$/;
  const formattedNumber = truncatedInput.replace(
    expirationDateFormat,
    (_, p1, p2) => {
      const formattedGroups = [p1 && `${p1}`, p2 && `${p2}`];
      return formattedGroups.filter(Boolean).join('/');
    },
  );

  return formattedNumber;
};

const getMaskedCVC = (value: string) => {
  const numericInput = value.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 3);
  const cvcFormat = /^(\d{3})?$/;
  const formattedNumber = truncatedInput.replace(cvcFormat, (_, p1) => {
    const formattedGroups = [p1 && `${p1}`];
    return formattedGroups.filter(Boolean).join('');
  });

  return formattedNumber;
};

export const uiSchema: UiSchema = {
  phone: {
    'ui:formatter': (value: string) => getMaskedPhone(value),
  },
  zipCode: {
    'ui:formatter': (value: string) => getMaskedZipCode(value),
  },
  cardNumber: {
    'ui:formatter': (value: string) => getMaskedCardNumber(value),
  },
  expirationDate: {
    'ui:formatter': (value: string) => getMaskedExpirationDate(value),
  },
  cvc: {
    'ui:formatter': (value: string) => getMaskedCVC(value),
  },
};
