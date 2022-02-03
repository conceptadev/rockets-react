import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import DataProvider, { useDataProvider } from '@rockts-org/data-provider';
import { LoginParams } from './interfaces';

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

const authLogin = (loginData: LoginParams) =>
  DataProvider.post({
    uri: '/auth/login',
    body: loginData,
  });

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [user, setUser] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { data, error, execute } = useDataProvider(authLogin, false, {
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('access_token', data['access_token']);
        setUser('USER');
      }
    },
    onError: (error: Error) => {
      console.log({error});
    },
    onFinish: () => {
      setIsFetching(false);
    },
  });

  const doLogin = async (loginData: LoginParams) => {
    setIsFetching(true);
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

  const doLogout = async (loginData: LoginParams) => {
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, doLogin, doLogout, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
