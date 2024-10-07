import { ReactNode } from 'react';
export type RocketsAuthProps = {
    useAuth: () => void;
    onAuthSuccess: () => void;
    onAuthError: (error: unknown) => void;
    onLogout: () => void;
    handleRefreshTokenError: (error: unknown) => void;
};
export type RocketsDataProviderProps = {
    apiUrl: string;
};
export type RocketsLayoutProps = {
    AppBar: ReactNode;
    Layout: ReactNode;
    menuOptions: unknown;
};
