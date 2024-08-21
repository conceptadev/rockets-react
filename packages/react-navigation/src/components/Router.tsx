import React, {
  Children,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { DrawerItemProps } from '@concepta/react-material-ui/';
import RoutesRoot from './RoutesRoot';

const router = (
  AdminProvider: ComponentType<PropsWithChildren<{ home: string }>>,
  routes: ReactElement[],
  items: DrawerItemProps[],
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode,
  renderSignUp?: (home: string) => ReactNode,
  renderForgotPassword?: (home: string) => ReactNode,
  renderResetPassword?: (home: string) => ReactNode,
) => {
  const firstRoute = routes[0];

  return createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/*"
        element={
          <AdminProvider home={firstRoute?.props.id}>
            <RoutesRoot
              routes={routes}
              items={items}
              renderAppBar={renderAppBar}
              renderSignUp={renderSignUp}
              renderForgotPassword={renderForgotPassword}
              renderResetPassword={renderResetPassword}
            />
          </AdminProvider>
        }
      />,
    ),
  );
};

type RouterProps = {
  children: ReactElement[];
  AdminProvider: ComponentType<PropsWithChildren<{ home: string }>>;
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode;
  renderSignUp?: (home: string) => ReactNode;
  renderForgotPassword?: (home: string) => ReactNode;
  renderResetPassword?: (home: string) => ReactNode;
};

const Router = ({
  children,
  AdminProvider,
  renderAppBar,
  renderSignUp,
  renderForgotPassword,
  renderResetPassword,
}: RouterProps) => {
  const items = Children.map(children, (child) => {
    return {
      id: child.props.id,
      text: child.props.name,
      icon: child.props.icon,
    };
  });

  return (
    <RouterProvider
      router={router(
        AdminProvider,
        children,
        items,
        renderAppBar,
        renderSignUp,
        renderForgotPassword,
        renderResetPassword,
      )}
    />
  );
};

export default Router;
