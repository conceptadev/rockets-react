import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppBarContainer from './AppBarContainer';
import {
  CrudModule,
  DrawerItemProps,
  DrawerProps,
  NavbarProps,
} from '@concepta/react-material-ui/';
import { ModuleProps } from '@concepta/react-material-ui/dist/modules/crud';

type DefaultRouteProps = {
  resource: string;
  name: string;
  module?: ModuleProps;
  page?: ReactNode;
  items: DrawerItemProps[];
  drawerProps?: DrawerProps;
  navbarProps?: NavbarProps;
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode;
};

const DefaultRoute = ({
  resource,
  name,
  module,
  page,
  items,
  drawerProps,
  navbarProps,
  renderAppBar,
}: DefaultRouteProps) => {
  const navigate = useNavigate();

  const resourceName = resource.substring(1);

  const menuItems = items?.map((item) => ({
    ...item,
    onClick: () => {
      if (!item?.id) return;
      navigate(item.id);
    },
  }));

  let renderedChildren = null;

  if (page) {
    renderedChildren = page;
  }

  if (module) {
    renderedChildren = (
      <CrudModule
        {...module}
        resource={resourceName}
        title={name}
        navigate={navigate}
      />
    );
  }

  if (renderAppBar) {
    return (
      <ProtectedRoute>
        {renderAppBar(menuItems, renderedChildren)}
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppBarContainer
        menuItems={menuItems}
        drawerProps={drawerProps}
        navbarProps={navbarProps}
      >
        {renderedChildren}
      </AppBarContainer>
    </ProtectedRoute>
  );
};

export default DefaultRoute;
