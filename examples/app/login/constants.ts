'use client';

import type { FormType } from '@concepta/react-material-ui/dist/components/SimpleForm';

export type FormData = {
  name: string;
  email: string;
};

export const schema: FormType = {
  submitButtonLabel: 'Send',
  fields: {
    email: {
      type: 'string',
      title: 'Email',
      required: true,
    },
    password: {
      type: 'password',
      title: 'Password',
      required: true,
    },
  },
};
