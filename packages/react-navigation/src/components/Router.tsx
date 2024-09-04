import React, { Children, ReactElement, ReactNode } from 'react';
import {
  createMemoryRouter,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import {
  DrawerItemProps,
  AuthModuleProps,
  DrawerProps,
  NavbarProps,
} from '@concepta/react-material-ui/';

import LoginRoute from './LoginRoute';
import DefaultRoute from './DefaultRoute';
import SignUpRoute from './SignUpRoute';
import ResetPasswordRoute from './ResetPasswordRoute';
import ForgotPasswordRoute from './ForgotPasswordRoute';

export type AuthModule = {
  signIn?: AuthModuleProps;
  signUp?: AuthModuleProps;
  forgotPassword?: AuthModuleProps;
  resetPassword?: AuthModuleProps;
};

type RouterProps = {
  children: ReactElement[];
  useNavigateFilter?: boolean;
  initialRoute?: string;
  useMemoryRouter?: boolean;
  authModuleProps?: AuthModule;
  drawerProps?: DrawerProps;
  navbarProps?: NavbarProps;
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode;
  renderSignIn?: (home: string) => ReactNode;
  renderSignUp?: (home: string) => ReactNode;
  renderForgotPassword?: (home: string) => ReactNode;
  renderResetPassword?: (home: string) => ReactNode;
};

const Router = ({
  children,
  useNavigateFilter,
  initialRoute,
  useMemoryRouter = false,
  authModuleProps,
  drawerProps,
  navbarProps,
  renderAppBar,
  renderSignIn,
  renderSignUp,
  renderForgotPassword,
  renderResetPassword,
}: RouterProps) => {
  const items = Children.map(children, (child) => {
    // This validation is needed so `showDrawerItem`
    // can be `true` by default
    if (
      child.props.showDrawerItem !== undefined &&
      !child.props.showDrawerItem
    ) {
      return null;
    }

    return {
      id: child.props.id,
      text: child.props.name,
      icon: child.props.icon,
    };
  }).filter((item) => !!item);

  const home = children[0].props.id;

  const createRouter = useMemoryRouter
    ? createMemoryRouter
    : createBrowserRouter;

  const router = createRouter([
    {
      path: '/',
      element: <Navigate to={initialRoute ?? home} replace />,
    },
    {
      path: '/sign-in',
      element: renderSignIn ? (
        renderSignIn(home)
      ) : (
        <LoginRoute home={home} moduleProps={authModuleProps?.signIn} />
      ),
    },
    {
      path: '/sign-up',
      element: renderSignUp ? (
        renderSignUp(home)
      ) : (
        <SignUpRoute home={home} moduleProps={authModuleProps?.signUp} />
      ),
    },
    {
      path: '/forgot-password',
      element: renderForgotPassword ? (
        renderForgotPassword(home)
      ) : (
        <ForgotPasswordRoute
          home={home}
          moduleProps={authModuleProps?.forgotPassword}
        />
      ),
    },
    {
      path: '/reset-password',
      element: renderResetPassword ? (
        renderResetPassword(home)
      ) : (
        <ResetPasswordRoute
          home={home}
          moduleProps={authModuleProps?.resetPassword}
        />
      ),
    },
    ...Children.map(children, (child) => ({
      path: child.props.id,
      element: (
        <DefaultRoute
          renderAppBar={renderAppBar}
          isUnprotected={child.props.isUnprotected}
          useNavigateFilter={useNavigateFilter}
          resource={child.props.id}
          name={child.props.name}
          showAppBar={child.props.showAppBar}
          module={child.props.module}
          isFormPage={child.props.isFormPage}
          page={child.props.page}
          items={items}
          drawerProps={drawerProps}
          navbarProps={navbarProps}
        />
      ),
    })),
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
