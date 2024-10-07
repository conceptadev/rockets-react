import React, { ReactNode } from 'react';
import { HttpError } from './interfaces';
export type ClientContextType = {
    baseUrl: string;
    onRefreshTokenError: (error?: HttpError) => void;
};
export declare const ClientContext: React.Context<ClientContextType>;
export declare const useClient: () => ClientContextType;
type Props = {
    baseUrl?: string;
    onRefreshTokenError?: (error?: HttpError) => void;
    children: ReactNode;
};
declare const ClientProvider: ({ baseUrl: outerBaseUrl, onRefreshTokenError, children, }: Props) => JSX.Element;
export default ClientProvider;
