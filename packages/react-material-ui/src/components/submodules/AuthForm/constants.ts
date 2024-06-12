import type { RJSFSchema, UiSchema } from '@rjsf/utils';

import {
  CustomTextFieldWidget,
  CustomPasswordFieldWidget,
} from '../../../styles/CustomWidgets';

import { useTranslation } from '../../../utils/intl/i18n';

export const defaultAuthUiSchema: UiSchema = {
  email: {
    'ui:widget': CustomTextFieldWidget,
  },
  username: {
    'ui:widget': CustomTextFieldWidget,
  },
  password: {
    'ui:widget': CustomPasswordFieldWidget,
  },
  newPassword: {
    'ui:widget': CustomPasswordFieldWidget,
  },
  confirmNewPassword: {
    'ui:widget': CustomPasswordFieldWidget,
  },
};

export const getSignInFormSchema = () => {
  const { t } = useTranslation();

  return {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        title: t('auth:username'),
        minLength: 3,
      },
      password: { type: 'string', title: t('auth:password') },
    },
  } as RJSFSchema;
};

export const getSignUpFormSchema = () => {
  const { t } = useTranslation();

  return {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
      email: {
        type: 'string',
        title: t('auth:email'),
        minLength: 3,
        format: 'email',
      },
      username: { type: 'string', title: t('auth:username'), minLength: 3 },
      password: { type: 'string', title: t('auth:password') },
    },
  } as RJSFSchema;
};

export const getForgotPasswordFormSchema = () => {
  const { t } = useTranslation();

  return {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        title: t('auth:email'),
        minLength: 3,
        format: 'email',
      },
    },
  } as RJSFSchema;
};

export const getResetPasswordFormSchema = () => {
  const { t } = useTranslation();

  return {
    type: 'object',
    required: ['newPassword', 'confirmNewPassword'],
    properties: {
      newPassword: {
        type: 'string',
        title: t('auth:newPassword'),
      },
      confirmNewPassword: {
        type: 'string',
        title: t('auth:confirmNewPassword'),
      },
    },
  } as RJSFSchema;
};
