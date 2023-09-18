export interface LoginParams {
  username: string;
  password: string;
}

export type AuthProviderTypes = {
  user: unknown;
  setUser: React.Dispatch<unknown>;
  doLogin: (loginData: LoginParams) => void;
  doLogout: () => void;
  isFetching: unknown;
  accessToken: string;
  refreshToken: string;
};
