import React from 'react';

import AuthFormSubmodule, {
  AuthFormSubmoduleProps,
} from '../../components/submodules/AuthForm';

import {
  signInModuleProps,
  signUpModuleProps,
  forgotPasswordModuleProps,
  resetPasswordModuleProps,
} from './constants';

export interface AuthModuleProps extends AuthFormSubmoduleProps {
  formProps?: Omit<AuthFormSubmoduleProps, 'route'>;
}

export const AuthModule = (props: AuthModuleProps) => {
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
