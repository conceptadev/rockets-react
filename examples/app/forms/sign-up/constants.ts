'use client';

import type { RJSFSchema } from '@rjsf/utils';

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
    email: { type: 'string', title: 'Email', format: 'email' },
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
