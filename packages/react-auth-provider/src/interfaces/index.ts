export interface LoginParams {
  loginPath?: string;
  username?: string;
  password?: string;
  [key: string]: string | number;
}

export type AuthProviderProps = {
  onSuccess?: (accessToken?: string) => void;
  onError?: (error?: Error) => void;
};

export type AuthProviderTypes = {
  user: unknown;
  setUser: React.Dispatch<unknown>;
  doLogin: (loginData: LoginParams) => void;
  doLogout: () => void;
  isPending: unknown;
  accessToken: string;
  refreshToken: string;
};

export interface AuthReponse {
  accessToken: string;
  refreshToken: string;
}
