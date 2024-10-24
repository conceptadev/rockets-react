import React, { PropsWithChildren } from 'react';
import { ClientProvider } from '@concepta/react-data-provider';
import { AuthProvider } from '@concepta/react-auth-provider';
import {
  RocketsAuthProps,
  RocketsDataProviderProps,
  RocketsLayoutProps,
} from './types';
import { ThemeProvider } from '../../styles';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { themeLight } from '../../styles/theme';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

injectStyle();

export type RocketsProps = {
  /**
   * Authentication configuration for the Rockets component.
   */
  auth: Partial<RocketsAuthProps>;
  /**
   * Data provider configuration for the Rockets component.
   */
  dataProvider: Partial<RocketsDataProviderProps>;
  /**
   * Layout configuration for the Rockets component.
   */
  layout?: RocketsLayoutProps;

  theme?: ThemeProviderProps['theme'];
};

/**
 * The `Rockets` component serves as the main wrapper for the application,
 * providing authentication, data provider, and theme context to its children.
 *
 * @param children - The child components to be rendered within the Rockets component.
 * @param auth - The authentication configuration.
 * @param dataProvider - The data provider configuration.
 *
 * @example
 * ```tsx
 * <Rockets
 *   auth={{
 *     useAuth: myAuthHook,
 *     onAuthSuccess: handleSuccess,
 *     onAuthError: handleError,
 *     onLogout: handleLogout,
 *     handleRefreshTokenError: handleTokenError,
 *     handleForbiddenAccessError: handleForbiddenError,
 *   }}
 *   dataProvider={{ apiUrl: 'https://api.example.com' }}
 *   layout={{ AppBar: MyAppBar, Layout: MyLayout, menuOptions: myMenuOptions }}
 * >
 *   <MyApp />
 * </Rockets>
 * ```
 */
const RocketsProvider = ({
  children,
  auth,
  dataProvider,
  theme,
}: PropsWithChildren<RocketsProps>) => {
  return (
    <ClientProvider
      baseUrl={dataProvider.apiUrl}
      onRefreshTokenError={auth.handleRefreshTokenError}
      onForbiddenAccessError={auth.handleForbiddenAccessError}
    >
      <ThemeProvider theme={theme ?? themeLight}>
        <ToastContainer
          hideProgressBar
          position="top-center"
          limit={3}
          autoClose={3000}
        />
        <AuthProvider onSuccess={auth.onAuthSuccess} onError={auth.onAuthError}>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </ClientProvider>
  );
};

export default RocketsProvider;
