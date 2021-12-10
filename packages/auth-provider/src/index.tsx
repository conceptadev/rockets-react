import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import dataProvider from '@rockts-org/data-provider';
import { LoginParams } from './interfaces';

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [user, setUser] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const doLogin = async (loginData: LoginParams) => {
    setIsFetching(true);
    const token = await dataProvider.post({
      uri: '/auth/login',
      body: loginData,
    });

    if (token) {
      localStorage.setItem('access_token', token['access_token']);
      setUser('USER');
    }
    setIsFetching(false);
  };

  const doLogout = async (loginData: LoginParams) => {
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, doLogin, doLogout, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
