import { type ReactNode } from 'react';
import { DrawerItemProps, DrawerProps, NavbarProps } from '@concepta/react-material-ui';
type AppBarContainer = {
    children: ReactNode;
    menuItems: DrawerItemProps[];
    drawerProps?: DrawerProps;
    navbarProps?: NavbarProps;
};
export default function AppBarContainer({ children, menuItems, drawerProps, navbarProps, }: AppBarContainer): JSX.Element;
export {};
