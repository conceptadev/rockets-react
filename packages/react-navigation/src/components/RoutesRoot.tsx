import React, { Children, ReactElement, ReactNode } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginRoute from './LoginRoute';
import { DrawerItemProps } from '@concepta/react-material-ui';
import DefaultRoute from './DefaultRoute';
import SignUpRoute from './SignUpRoute';
import ResetPasswordRoute from './ResetPasswordRoute';
import ForgotPasswordRoute from './ForgotPasswordRoute';

type RoutesRootProps = {
  items: DrawerItemProps[];
  routes: ReactElement[];
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode;
  renderSignUp?: (home: string) => ReactNode;
  renderForgotPassword?: (home: string) => ReactNode;
  renderResetPassword?: (home: string) => ReactNode;
};

const RoutesRoot = ({
  routes,
  items,
  renderAppBar,
  renderSignUp,
  renderForgotPassword,
  renderResetPassword,
}: RoutesRootProps) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes[0].props.id} replace />} />
      <Route
        path="/sign-in"
        element={<LoginRoute home={routes[0].props.id} />}
      />
      <Route
        path="/sign-up"
        element={
          renderSignUp ? (
            renderSignUp(routes[0].props.id)
          ) : (
            <SignUpRoute home={routes[0].props.id} />
          )
        }
      />
      <Route
        path="/forgot-password"
        element={
          renderForgotPassword ? (
            renderForgotPassword(routes[0].props.id)
          ) : (
            <ForgotPasswordRoute home={routes[0].props.id} />
          )
        }
      />
      <Route
        path="/reset-password"
        element={
          renderResetPassword ? (
            renderResetPassword(routes[0].props.id)
          ) : (
            <ResetPasswordRoute home={routes[0].props.id} />
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
                items={items}
                module={child.props.module}
                page={child.props.page}
              />
            }
          />
        );
      })}
    </Routes>
  );
};

export default RoutesRoot;
