import { PropsWithChildren } from 'react';
import { LoginParams, AuthProviderProps, AuthProviderTypes } from './interfaces';
declare const useAuth: () => AuthProviderTypes;
declare const AuthProvider: ({ children, onSuccess, onError, }: PropsWithChildren<AuthProviderProps & unknown>) => JSX.Element;
export { LoginParams, useAuth, AuthProvider, AuthProviderTypes, AuthProviderProps, };
