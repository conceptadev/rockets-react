import React, { ReactElement } from 'react';
import {
  createMemoryRouter,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';

type RouterProps = {
  rootElement?: ReactElement;
  childRoutes?: ReactElement;
  initialRoute?: string;
  useMemoryRouter?: boolean;
};

const Router = ({
  rootElement,
  initialRoute,
  childRoutes,
  useMemoryRouter = false,
}: RouterProps) => {
  const createRouter = useMemoryRouter
    ? createMemoryRouter
    : createBrowserRouter;

  const router = createRouter([
    {
      path: '/',
      element: rootElement ? (
        React.cloneElement(
          rootElement,
          {},
          <>
            <Outlet />
            {initialRoute && <Navigate to={initialRoute} replace />}
          </>,
        )
      ) : (
        <div>
          Home test no root
          <Outlet />
        </div>
      ),
      children: [
        {
          path: '*',
          element: childRoutes,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
