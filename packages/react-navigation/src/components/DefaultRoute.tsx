import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppBarContainer from './AppBarContainer';
import {
  CrudModule,
  DrawerItemProps,
  DrawerProps,
  NavbarProps,
  FormModule,
} from '@concepta/react-material-ui/';
import { ModuleProps } from '@concepta/react-material-ui/dist/modules/crud';

type DefaultRouteProps = {
  resource: string;
  name: string;
  useNavigateFilter?: boolean;
  isUnprotected?: boolean;
  showAppBar?: boolean;
  module?: ModuleProps;
  page?: ReactNode;
  isFormPage?: boolean;
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
  useNavigateFilter = true,
  isUnprotected = false,
  showAppBar = true,
  module,
  page,
  isFormPage = false,
  items,
  drawerProps,
  navbarProps,
  renderAppBar,
}: DefaultRouteProps): JSX.Element => {
  const navigate = useNavigate();
  const resourceName = resource.substring(1);

  const menuItems = items.map((item) => ({
    ...item,
    onClick: () => item?.id && navigate(item.id),
  }));

  const content =
    module && !isFormPage ? (
      <CrudModule
        {...module}
        resource={resourceName}
        title={name}
        navigate={useNavigateFilter ? navigate : undefined}
      />
    ) : isFormPage ? (
      <FormModule
        {...module}
        resource={resourceName}
        title={name}
        navigate={useNavigateFilter ? navigate : undefined}
      />
    ) : (
      page
    );

  const wrappedContent = showAppBar ? (
    renderAppBar ? (
      renderAppBar(menuItems, content)
    ) : (
      <AppBarContainer
        menuItems={menuItems}
        drawerProps={drawerProps}
        navbarProps={navbarProps}
      >
        {content}
      </AppBarContainer>
    )
  ) : (
    content
  );

  const finalContent = isUnprotected ? (
    wrappedContent
  ) : (
    <ProtectedRoute>{wrappedContent}</ProtectedRoute>
  );

  return <>{finalContent}</>;
};

export default DefaultRoute;
