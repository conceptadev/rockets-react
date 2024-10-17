import React, { Children, ReactElement, ReactNode, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  DrawerItemProps,
  AuthModuleProps,
  DrawerProps,
  NavbarProps,
} from '@concepta/react-material-ui/';

import DefaultRoute from './DefaultRoute';
import AuthRoute from './AuthRoute';

export type AuthModule = {
  signIn?: AuthModuleProps;
  signUp?: AuthModuleProps;
  forgotPassword?: AuthModuleProps;
  resetPassword?: AuthModuleProps;
};

type ChildRoutesProps = {
  children: ReactElement[];
  useNavigateFilter?: boolean;
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

const ChildRoutes = ({
  children,
  useNavigateFilter,
  authModuleProps,
  drawerProps,
  navbarProps,
  renderAppBar,
  renderSignIn,
  renderSignUp,
  renderForgotPassword,
  renderResetPassword,
}: ChildRoutesProps) => {
  const [isDrawerCollapsed, setDrawerCollapsed] = useState(
    Boolean(drawerProps.collapsed),
  );

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

  const routesChildren = useRoutes([
    {
      path: 'sign-in',
      element: renderSignIn ? (
        renderSignIn(home)
      ) : (
        <AuthRoute
          home={home}
          moduleProps={authModuleProps?.signIn}
          route="signIn"
        />
      ),
    },
    {
      path: 'sign-up',
      element: renderSignUp ? (
        renderSignUp(home)
      ) : (
        <AuthRoute
          home={home}
          moduleProps={authModuleProps?.signUp}
          route="signUp"
        />
      ),
    },
    {
      path: 'forgot-password',
      element: renderForgotPassword ? (
        renderForgotPassword(home)
      ) : (
        <AuthRoute
          home={home}
          moduleProps={authModuleProps?.forgotPassword}
          route={'forgotPassword'}
        />
      ),
    },
    {
      path: 'reset-password',
      element: renderResetPassword ? (
        renderResetPassword(home)
      ) : (
        <AuthRoute
          home={home}
          moduleProps={authModuleProps?.resetPassword}
          route="resetPassword"
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
          page={child.props.page}
          items={items}
          drawerProps={{
            ...drawerProps,
            collapsed: isDrawerCollapsed,
            onCollapsedChange: (collapsed) => {
              setDrawerCollapsed(collapsed);
              if (drawerProps.onCollapsedChange) {
                drawerProps.onCollapsedChange(collapsed);
              }
            },
          }}
          navbarProps={navbarProps}
        />
      ),
    })),
  ]);

  return routesChildren;
};

export default ChildRoutes;
