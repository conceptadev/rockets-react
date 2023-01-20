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
};

export const ClientContext = createContext<ClientContextType>({ baseUrl: '' });

export const useClient = () => useContext<ClientContextType>(ClientContext);

type Props = {
  baseUrl?: string;
  children: ReactNode;
};

const ClientProvider: FC<Props> = ({ baseUrl: outerBaseUrl, children }) => {
  const [baseUrl, setBaseUrl] = useState<string>();

  useEffect(() => {
    if (outerBaseUrl) {
      setBaseUrl(outerBaseUrl);
    }
  }, [outerBaseUrl]);

  return (
    <ClientContext.Provider value={{ baseUrl }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
