import React, {
  Children,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import {
  createMemoryRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import {
  DrawerItemProps,
  AuthModuleProps,
  DrawerProps,
  NavbarProps,
} from '@concepta/react-material-ui/';
import RoutesRoot from './RoutesRoot';

export type AuthModule = {
  signIn?: AuthModuleProps;
  signUp?: AuthModuleProps;
  forgotPassword?: AuthModuleProps;
  resetPassword?: AuthModuleProps;
};

const router = (
  AdminProvider: ComponentType<PropsWithChildren<{ home: string }>>,
  routes: ReactElement[],
  items: DrawerItemProps[],
  initialRoute?: string,
  authModuleProps?: AuthModule,
  drawerProps?: DrawerProps,
  navbarProps?: NavbarProps,
  useMemoryRouter?: boolean,
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode,
  renderSignIn?: (home: string) => ReactNode,
  renderSignUp?: (home: string) => ReactNode,
  renderForgotPassword?: (home: string) => ReactNode,
  renderResetPassword?: (home: string) => ReactNode,
) => {
  const firstRoute = routes[0];

  const createRouter = useMemoryRouter
    ? createMemoryRouter
    : createBrowserRouter;

  return createRouter(
    createRoutesFromElements(
      <Route
        path="/*"
        element={
          <AdminProvider home={initialRoute ?? firstRoute?.props.id}>
            <RoutesRoot
              routes={routes}
              items={items}
              initialRoute={initialRoute}
              authModuleProps={authModuleProps}
              drawerProps={drawerProps}
              navbarProps={navbarProps}
              renderAppBar={renderAppBar}
              renderSignIn={renderSignIn}
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
  AdminProvider,
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
        initialRoute,
        authModuleProps,
        drawerProps,
        navbarProps,
        useMemoryRouter,
        renderAppBar,
        renderSignIn,
        renderSignUp,
        renderForgotPassword,
        renderResetPassword,
      )}
    />
  );
};

export default Router;
