import React from 'react';

import { Navigate } from 'react-router';
import { useAuth } from '@concepta/react-auth-provider';
import { AuthModule } from '@concepta/react-material-ui/';
import { toast } from 'react-toastify';

type ResetPasswordRouteProps = {
  home: string;
};

const ResetPasswordRoute = ({ home }: ResetPasswordRouteProps) => {
  const { accessToken: authAccessToken } = useAuth();

  const accessToken = authAccessToken ?? localStorage.getItem('accessToken');

  if (accessToken) {
    return <Navigate to={home} replace />;
  }

  return (
    <AuthModule
      route="resetPassword"
      moduleProps={{
        signInPath: '/sign-in',
        onSuccess: () => toast.success('Success!'),
        onError: (error: any) =>
          toast.error(
            error?.response?.data?.message ||
              'An error has occurred. Please try again later or contact support for assistance.',
          ),
      }}
    />
  );
};

export default ResetPasswordRoute;
