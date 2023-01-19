import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import { LoginParams, AuthProviderTypes } from './interfaces';

const AuthContext = createContext<AuthProviderTypes | null>(null);

export const useAuth = () => useContext<AuthProviderTypes>(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { post } = useDataProvider();

  const [user, setUser] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const authLogin = (loginData: LoginParams) =>
    post({
      uri: '/auth/login',
      body: loginData,
    });

  const { execute } = useQuery(authLogin, false, {
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('access_token', data['access_token']);
        setUser('USER');
      }
    },
    onError: (error: Error) => {
      console.error({ error });
    },
    onFinish: () => {
      setIsFetching(false);
    },
  });

  const doLogin = async (loginData: LoginParams) => {
    setIsFetching(true);

    // TODO: Understand why it has to be an array
    execute(loginData);

    // const token = await DataProvider.post({
    //   uri: '/auth/login',
    //   body: loginData,
    // });

    // if (token) {
    //   localStorage.setItem('access_token', token['access_token']);
    //   setUser('USER');
    // }
    // setIsFetching(false);
  };

  const doLogout = async () => {
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, doLogin, doLogout, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
