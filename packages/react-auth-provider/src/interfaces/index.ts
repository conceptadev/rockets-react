export interface LoginParams {
  loginPath?: string;
  username?: string;
  password?: string;
  [key: string]: string | number | boolean;
}

export type AuthProviderProps = {
  onSuccess?: (accessToken?: string) => void;
  onError?: (error?: Error) => void;
};

export type DoLogin = <TLoginParams>(
  loginData: LoginParams | TLoginParams,
) => void;

export type AuthProviderTypes = {
  user: unknown;
  setUser: React.Dispatch<unknown>;
  doLogin: DoLogin;
  doLogout: () => void;
  isPending: unknown;
  accessToken: string;
  refreshToken: string;
};

export interface AuthReponse {
  accessToken: string;
  refreshToken: string;
}
