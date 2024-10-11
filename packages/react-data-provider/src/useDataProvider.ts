import memoizee from 'memoizee';

import axiosClient from './axiosClient';
import {
  HttpClient,
  HttpError,
  HttpResponse,
  RequestParams,
  PostRequestOptions,
  GetRequestOptions,
  PutRequestOptions,
  PatchRequestOptions,
  DeleteRequestOptions,
  Token,
  RefreshTokenBody,
  RefreshTokenRes,
} from './interfaces';
import { useClient } from './ClientProvider';

const maxAge = 10000;

const useDataProvider = () => {
  const { baseUrl, onRefreshTokenError, onForbiddenAccessError } = useClient();

  //TODO
  //let user inject any http instance that match the HttpClient interface requirements
  const client: HttpClient = axiosClient;

  /**
   * Asynchronously refreshes an access token using a stored refresh token.
   *
   * @returns A promise that resolves with the response from the token refresh request or rejects with an error.
   * @throws If an exception occurs while refreshing the token.
   */
  const refreshAccessToken = memoizee(
    async (): Promise<Token | HttpError> => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await post<RefreshTokenBody, RefreshTokenRes>({
          uri: '/token/refresh',
          body: {
            refreshToken,
          },
        });

        if (response?.accessToken && response?.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        return Promise.resolve(response);
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        onRefreshTokenError?.(error);
        return Promise.reject(error);
      }
    },
    { maxAge },
  );

  client.defaultConfig({
    baseURL: baseUrl,
    skipAuthUris: ['login', 'refresh'],
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.applyMiddleware({
    getAccessToken: () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        return accessToken;
      } else {
        //TODO
        //redirect to login
      }
    },
    getNewToken: async () => {
      return await refreshAccessToken();
    },
  });

  const makeRequest = <TQueryData>(requestParams: RequestParams) => {
    return client
      .executeRequest(requestParams)
      .then((res) => handleServerResponse<TQueryData>(res))
      .catch((err) => handleServerError(err));
  };

  //TODO
  //if we need to normalize response no matter what client we are using or use a custom response
  //that will be more user friendly
  const handleServerResponse = <TQueryData = unknown>(
    response: HttpResponse,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { config, data, headers, status } = response;
    return data as TQueryData;
  };

  //TODO
  //if we need to normalize error no matter what client we are using or use a custom error response
  //that will be more user friendly
  const handleServerError = (err: HttpError) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, response, message } = err;
    if (response.status === 403) {
      onForbiddenAccessError?.(err);
    }
    throw err;
  };

  const post = async <TRequestBody = unknown, TQueryData = unknown>(
    requestParams: PostRequestOptions<TRequestBody>,
  ) => {
    return makeRequest<TQueryData>({
      ...requestParams,
      method: 'POST',
    });
  };

  const get = async <TQueryData = unknown>(
    requestParams: GetRequestOptions,
  ) => {
    return makeRequest<TQueryData>({
      ...requestParams,
      method: 'GET',
    });
  };
  const put = async <TRequestBody = unknown, TQueryData = unknown>(
    requestParams: PutRequestOptions<TRequestBody>,
  ) => {
    return makeRequest<TQueryData>({
      ...requestParams,
      method: 'PUT',
    });
  };
  const patch = async <TRequestBody = unknown, TQueryData = unknown>(
    requestParams: PatchRequestOptions<TRequestBody>,
  ) => {
    return makeRequest<TQueryData>({
      ...requestParams,
      method: 'PATCH',
    });
  };
  const del = async <TQueryData = unknown>(
    requestParams: DeleteRequestOptions,
  ) => {
    return makeRequest<TQueryData>({
      ...requestParams,
      method: 'DELETE',
    });
  };

  return { post, get, put, patch, del };
};

export default useDataProvider;
