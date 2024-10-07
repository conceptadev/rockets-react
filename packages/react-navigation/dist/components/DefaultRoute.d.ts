import { ReactNode } from 'react';
import { DrawerItemProps, DrawerProps, NavbarProps } from '@concepta/react-material-ui/';
import { ModuleProps } from '@concepta/react-material-ui/dist/modules/crud';
type DefaultRouteProps = {
    resource: string;
    name: string;
    useNavigateFilter?: boolean;
    isUnprotected?: boolean;
    showAppBar?: boolean;
    module?: ModuleProps;
    page?: ReactNode;
    items: DrawerItemProps[];
    drawerProps?: DrawerProps;
    navbarProps?: NavbarProps;
    renderAppBar?: (menuItems: DrawerItemProps[], children: ReactNode) => ReactNode;
};
declare const DefaultRoute: ({ resource, name, useNavigateFilter, isUnprotected, showAppBar, module, page, items, drawerProps, navbarProps, renderAppBar, }: DefaultRouteProps) => JSX.Element;
export default DefaultRoute;
