import { useEffect } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import {
  LoginParams,
  DoLogin,
  AuthProviderProps,
  AuthProviderTypes,
  AuthReponse,
} from './interfaces';

const AuthContext = createContext<AuthProviderTypes | null>(null);

/**
 * Custom hook that wraps the implementation of the Auth context.
 */
const useAuth = () => useContext<AuthProviderTypes>(AuthContext);

const AuthProvider = ({
  children,
  onSuccess,
  onError,
}: PropsWithChildren<AuthProviderProps & unknown>) => {
  const { post } = useDataProvider();

  const [user, setUser] = useState<unknown>();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  useEffect(() => {
    const _accessToken = localStorage.getItem('accessToken');
    setAccessToken(_accessToken);
  }, []);

  const authLogin = (loginData: LoginParams) => {
    const { loginPath, ...bodyData } = loginData;
    return post({
      uri: loginPath || '/auth/signin',
      body: bodyData,
    });
  };

  const { execute, isPending } = useQuery<AuthReponse>(authLogin, false, {
    onSuccess: (data) => {
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        onSuccess?.(data.accessToken);
      }
    },
    onError: (error: Error) => {
      console.error({ error });
      onError?.(error);
    },
  });

  const doLogin: DoLogin = async (loginData) => {
    execute(loginData);
  };

  const doLogout = async () => {
    setAccessToken(undefined);
    setRefreshToken(undefined);
    setUser(undefined);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        doLogin,
        doLogout,
        isPending,
        accessToken,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
  LoginParams,
  useAuth,
  AuthProvider,
  AuthProviderTypes,
  AuthProviderProps,
};
