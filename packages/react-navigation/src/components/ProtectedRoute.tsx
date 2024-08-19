import { useAuth } from '@concepta/react-auth-provider';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  redirectPath?: string;
};

const ProtectedRoute = ({
  children,
  redirectPath = '/sign-in',
}: PropsWithChildren<ProtectedRouteProps>) => {
  const { accessToken: authAccessToken } = useAuth();

  const accessToken = authAccessToken ?? localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
