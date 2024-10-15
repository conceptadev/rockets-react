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
        React.cloneElement(rootElement, {}, <Outlet />)
      ) : (
        <Outlet />
      ),
      children: [
        ...(initialRoute
          ? [
              {
                path: '/',
                element: <Navigate to={initialRoute} replace />,
              },
            ]
          : []),
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
