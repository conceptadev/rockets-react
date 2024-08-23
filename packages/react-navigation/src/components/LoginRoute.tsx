import React from 'react';

import { Navigate } from 'react-router';
import { useAuth } from '@concepta/react-auth-provider';
import { AuthModule, AuthModuleProps } from '@concepta/react-material-ui/';

type LoginRouteProps = {
  home: string;
  moduleProps?: AuthModuleProps;
};

const LoginRoute = ({ home, moduleProps }: LoginRouteProps) => {
  const { accessToken: authAccessToken } = useAuth();

  const accessToken = authAccessToken ?? localStorage.getItem('accessToken');

  if (accessToken) {
    return <Navigate to={home} replace />;
  }

  return <AuthModule route="signIn" {...(moduleProps || {})} />;
};

export default LoginRoute;
