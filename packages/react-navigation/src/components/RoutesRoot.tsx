import React, { Children, ReactElement, ReactNode } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginRoute from './LoginRoute';
import {
  DrawerItemProps,
  DrawerProps,
  NavbarProps,
} from '@concepta/react-material-ui';
import DefaultRoute from './DefaultRoute';
import SignUpRoute from './SignUpRoute';
import ResetPasswordRoute from './ResetPasswordRoute';
import ForgotPasswordRoute from './ForgotPasswordRoute';
import { AuthModule } from './Router';

type RoutesRootProps = {
  items: DrawerItemProps[];
  routes: ReactElement[];
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

const RoutesRoot = ({
  routes,
  items,
  authModuleProps,
  drawerProps,
  navbarProps,
  renderAppBar,
  renderSignIn,
  renderSignUp,
  renderForgotPassword,
  renderResetPassword,
}: RoutesRootProps) => {
  const home = routes[0].props.id;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={home} replace />} />
      <Route
        path="/sign-in"
        element={
          renderSignIn ? (
            renderSignIn(home)
          ) : (
            <LoginRoute home={home} moduleProps={authModuleProps?.signIn} />
          )
        }
      />
      <Route
        path="/sign-up"
        element={
          renderSignUp ? (
            renderSignUp(home)
          ) : (
            <SignUpRoute home={home} moduleProps={authModuleProps?.signUp} />
          )
        }
      />
      <Route
        path="/forgot-password"
        element={
          renderForgotPassword ? (
            renderForgotPassword(home)
          ) : (
            <ForgotPasswordRoute
              home={home}
              moduleProps={authModuleProps?.forgotPassword}
            />
          )
        }
      />
      <Route
        path="/reset-password"
        element={
          renderResetPassword ? (
            renderResetPassword(home)
          ) : (
            <ResetPasswordRoute
              home={home}
              moduleProps={authModuleProps?.resetPassword}
            />
          )
        }
      />
      {Children.map(routes, (child) => {
        return (
          <Route
            key={child.props.id}
            path={child.props.id}
            element={
              <DefaultRoute
                renderAppBar={renderAppBar}
                resource={child.props.id}
                name={child.props.name}
                module={child.props.module}
                page={child.props.page}
                items={items}
                drawerProps={drawerProps}
                navbarProps={navbarProps}
              />
            }
          />
        );
      })}
    </Routes>
  );
};

export default RoutesRoot;
