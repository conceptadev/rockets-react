import React, { ReactNode } from 'react';

import type { RJSFSchema, UiSchema } from '@rjsf/utils';

import type { ValidationRule } from '../../utils/form/validation';

import AuthFormSubmodule from '../../components/submodules/AuthForm';

import {
  signInModuleProps,
  signUpModuleProps,
  forgotPasswordModuleProps,
  resetPasswordModuleProps,
} from './constants';

type Route = 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword';

type Query = {
  uri?: string;
  method?: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};

interface FormProps {
  title?: string | ReactNode;
  hideTitle?: boolean;
  formSchema?: RJSFSchema;
  formUiSchema?: UiSchema;
  customValidation?: ValidationRule<Record<string, string>>[];
  overrideDefaults?: boolean;
  submitButtonTitle?: string;
}

interface AuthModuleProps {
  route: Route;
  query?: Query;
  headerComponent?: ReactNode;
  signInRequestPath?: string;
  forgotPasswordPath?: string;
  signUpPath?: string;
  signInPath?: string;
  logoSrc?: string;
  hideLogo?: boolean;
  formProps?: FormProps;
}

const AuthModule = (props: AuthModuleProps) => {
  const defaultModuleProps = {
    signIn: signInModuleProps,
    signUp: signUpModuleProps,
    forgotPassword: forgotPasswordModuleProps,
    resetPassword: resetPasswordModuleProps,
  }[props.route];

  const authQuery = {
    ...defaultModuleProps.query,
    ...props.query,
  };

  return (
    <AuthFormSubmodule
      {...props.formProps}
      {...defaultModuleProps}
      {...props}
      query={authQuery}
    />
  );
};

export default AuthModule;
