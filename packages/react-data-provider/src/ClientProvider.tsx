import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import { HttpError } from './interfaces';

export type ClientContextType = {
  baseUrl: string;
  onRefreshTokenError: (error?: HttpError) => void;
};

export const ClientContext = createContext<ClientContextType>({
  baseUrl: '',
  onRefreshTokenError: () => ({}),
});

export const useClient = () => useContext<ClientContextType>(ClientContext);

type Props = {
  baseUrl?: string;
  onRefreshTokenError: (error?: HttpError) => void;
  children: ReactNode;
};

const ClientProvider: FC<Props> = ({
  baseUrl: outerBaseUrl,
  onRefreshTokenError,
  children,
}) => {
  const [baseUrl, setBaseUrl] = useState<string>();

  useEffect(() => {
    if (outerBaseUrl) {
      setBaseUrl(outerBaseUrl);
    }
  }, [outerBaseUrl]);

  return (
    <ClientContext.Provider value={{ baseUrl, onRefreshTokenError }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
