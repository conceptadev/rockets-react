export interface LoginParams {
  /**
   * API path where the login request will be sent to.
   */
  loginPath?: string;
  /**
   * Parameter username that belongs to user credentials.
   */
  username?: string;
  /**
   * Parameter password that belongs to user credentials.
   */
  password?: string;
  /**
   * Custom credentials passed to the login request.
   */
  [key: string]: string | number | boolean;
}

export type AuthProviderProps = {
  /**
   * Callback for when the login request performs successfully.
   *
   * @param accessToken - The JWT token of the signed user.
   */
  onSuccess?: (accessToken?: string) => void;
  /**
   * Callback for when there's an error on the login request.
   *
   * @param accessToken - The error returned from the API.
   */
  onError?: (error?: Error) => void;
};

export type DoLogin = <TLoginParams>(
  loginData: LoginParams | TLoginParams,
) => void;

export type AuthProviderTypes = {
  /**
   * User data returned from a successfully performed login request.
   */
  user: unknown;
  /**
   * Callback for management of the login user data.
   */
  setUser: React.Dispatch<unknown>;
  /**
   * Callback for performing a login request.
   */
  doLogin: DoLogin;
  /**
   * Callback for performing a logout request.
   */
  doLogout: () => void;
  /**
   * Login request loading state indicator.
   */
  isPending: unknown;
  /**
   * JWT token assigned to the logged user.
   */
  accessToken: string;
  /**
   * JWT token used for refreshing an user token.
   */
  refreshToken: string;
};

export interface AuthReponse {
  /**
   * JWT token assigned to the logged user.
   */
  accessToken: string;
  /**
   * JWT token used for refreshing an user token.
   */
  refreshToken: string;
}
