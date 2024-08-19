import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppBarContainer from './AppBarContainer';
import { CrudModule, DrawerItemProps } from '@concepta/react-material-ui/';
import { ModuleProps } from '@concepta/react-material-ui/dist/modules/crud';

type DefaultRouteProps = {
  resource: string;
  name: string;
  module: ModuleProps;
  items: DrawerItemProps[];
  renderAppBar?: (
    menuItems: DrawerItemProps[],
    children: ReactNode,
  ) => ReactNode;
};

const DefaultRoute = ({
  resource,
  name,
  module,
  items,
  renderAppBar,
}: DefaultRouteProps) => {
  const navigate = useNavigate();

  const menuItems = items?.map((item) => ({
    ...item,
    onClick: () => {
      if (!item?.id) return;
      navigate(item.id);
    },
  }));

  if (renderAppBar) {
    return (
      <ProtectedRoute>
        {renderAppBar(
          menuItems,
          <CrudModule
            {...module}
            resource={resource}
            title={name}
            navigate={navigate}
          />,
        )}
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppBarContainer menuItems={menuItems}>
        <CrudModule
          {...module}
          resource={resource}
          title={name}
          navigate={navigate}
        />
      </AppBarContainer>
    </ProtectedRoute>
  );
};

export default DefaultRoute;
