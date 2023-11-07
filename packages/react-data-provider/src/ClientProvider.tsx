import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';

export type ClientContextType = {
  baseUrl: string;
  onRefreshTokenError: () => void;
};

export const ClientContext = createContext<ClientContextType>({
  baseUrl: '',
  onRefreshTokenError: () => ({}),
});

export const useClient = () => useContext<ClientContextType>(ClientContext);

type Props = {
  baseUrl?: string;
  onRefreshTokenError: () => void;
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
