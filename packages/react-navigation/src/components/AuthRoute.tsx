import React from 'react';

import { Navigate } from 'react-router';
import { useAuth } from '@concepta/react-auth-provider';
import { AuthModule, AuthModuleProps } from '@concepta/react-material-ui/';
import { toast } from 'react-toastify';

type Route = 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword';

type AuthRouteProps = {
  home: string;
  moduleProps?: AuthModuleProps;
  route: Route;
};

const AuthRoute = (props: AuthRouteProps) => {
  const { home, moduleProps, route } = props;
  const { accessToken: authAccessToken } = useAuth();

  const accessToken = authAccessToken ?? localStorage.getItem('accessToken');

  if (accessToken) {
    return <Navigate to={home} replace />;
  }

  const query: AuthModuleProps['query'] = {
    onSuccess: () => toast.success('Success!'),
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.message ||
          'An error has occurred. Please try again later or contact support for assistance.',
      ),
    ...props.moduleProps?.query,
  };

  const routeProps: Record<Route, AuthModuleProps> = {
    resetPassword: {
      route: 'resetPassword',
      signInPath: '/sign-in',
      query,
    },
    forgotPassword: {
      route: 'forgotPassword',
      signInPath: '/sign-in',
      query,
    },
    signIn: {
      route: 'signIn',
    },
    signUp: {
      route: 'signUp',
      signInPath: '/sign-in',
      query,
    },
  };

  return (
    <AuthModule
      {...routeProps[route]}
      {...{
        ...moduleProps,
        query:
          props.moduleProps.overrideDefaults && props.moduleProps?.query
            ? props.moduleProps?.query
            : routeProps[route].query,
      }}
    />
  );
};

export default AuthRoute;
