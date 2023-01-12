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

const ClientProvider: FC<Props> = ({ baseUrl: outterBaseUrl, children }) => {
  const [baseUrl, setBaseUrl] = useState<string>();

  useEffect(() => {
    if (outterBaseUrl) {
      setBaseUrl(outterBaseUrl);
    }
  }, [outterBaseUrl]);

  return (
    <ClientContext.Provider value={{ baseUrl }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
