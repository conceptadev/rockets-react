import React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMemo, Children } from 'react';
import {
  RouteProps,
  PathRouteProps,
  LayoutRouteProps,
  IndexRouteProps,
  RouterProps,
} from './interfaces';

export const useNavigate = ReactRouter.useNavigate;

export const Route: React.FC<
  RouteProps | PathRouteProps | LayoutRouteProps | IndexRouteProps
> = (props) => {
  return null;
};

export const ProtectedRoute: React.FC<
  RouteProps | PathRouteProps | LayoutRouteProps | IndexRouteProps
> = (props) => {
  return null;
};

export const PublicRoute = Route;

export const Router: React.FC<RouterProps> = ({
  children,
  isAuth,
  NotFoundComponent,
  UnauthorizedComponent,
}) => {
  const enhancedChildren: Array<React.ReactNode> = useMemo(() => {
    return Children.map(children, (child: JSX.Element) => {
      const { Component, requireAuth, ...restProps } = child?.props;

      if (!requireAuth && child.type.name !== 'ProtectedRoute') {
        return (
          <ReactRouter.Route
            {...restProps}
            element={<Component {...restProps} />}
          />
        );
      }

      if (!isAuth) {
        return (
          <ReactRouter.Route
            {...restProps}
            element={<ReactRouter.Navigate to="/unauthorized" />}
          />
        );
      }
      return (
        <ReactRouter.Route
          {...restProps}
          element={<Component {...restProps} />}
        />
      );
    });
  }, [children, isAuth]);

  return (
    <ReactRouter.BrowserRouter>
      <ReactRouter.Routes>
        <>
          {...enhancedChildren}
          <ReactRouter.Route
            path="/unauthorized"
            element={<UnauthorizedComponent />}
          />
          <ReactRouter.Route
            path="/not-found"
            element={<NotFoundComponent />}
          />
          <ReactRouter.Route
            path="*"
            element={<ReactRouter.Navigate to="/not-found" />}
          />
        </>
      </ReactRouter.Routes>
    </ReactRouter.BrowserRouter>
  );
};
