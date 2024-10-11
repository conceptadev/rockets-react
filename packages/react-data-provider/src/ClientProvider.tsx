import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';
import { HttpError } from './interfaces';

export type ClientContextType = {
  baseUrl: string;
  onRefreshTokenError: (error?: HttpError) => void;
  onForbiddenAccessError: (error?: HttpError) => void;
};

export const ClientContext = createContext<ClientContextType>({
  baseUrl: '',
  onRefreshTokenError: () => ({}),
  onForbiddenAccessError: () => ({}),
});

export const useClient = () => useContext<ClientContextType>(ClientContext);

const ClientProvider = ({
  baseUrl: outerBaseUrl,
  onRefreshTokenError,
  onForbiddenAccessError,
  children,
}: PropsWithChildren<Partial<ClientContextType>>) => {
  const [baseUrl, setBaseUrl] = useState<string>(outerBaseUrl || '');

  useEffect(() => {
    if (outerBaseUrl) {
      setBaseUrl(outerBaseUrl);
    }
  }, [outerBaseUrl]);

  return (
    <ClientContext.Provider
      value={{ baseUrl, onRefreshTokenError, onForbiddenAccessError }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
