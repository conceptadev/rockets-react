import { ReactElement, ReactNode } from 'react';
import { DrawerItemProps, AuthModuleProps, DrawerProps, NavbarProps } from '@concepta/react-material-ui/';
export type AuthModule = {
    signIn?: AuthModuleProps;
    signUp?: AuthModuleProps;
    forgotPassword?: AuthModuleProps;
    resetPassword?: AuthModuleProps;
};
type RouterProps = {
    children: ReactElement[];
    rootElement?: ReactElement;
    useNavigateFilter?: boolean;
    initialRoute?: string;
    useMemoryRouter?: boolean;
    authModuleProps?: AuthModule;
    drawerProps?: DrawerProps;
    navbarProps?: NavbarProps;
    renderAppBar?: (menuItems: DrawerItemProps[], children: ReactNode) => ReactNode;
    renderSignIn?: (home: string) => ReactNode;
    renderSignUp?: (home: string) => ReactNode;
    renderForgotPassword?: (home: string) => ReactNode;
    renderResetPassword?: (home: string) => ReactNode;
};
declare const Router: ({ children, rootElement, useNavigateFilter, initialRoute, useMemoryRouter, authModuleProps, drawerProps, navbarProps, renderAppBar, renderSignIn, renderSignUp, renderForgotPassword, renderResetPassword, }: RouterProps) => JSX.Element;
export default Router;
