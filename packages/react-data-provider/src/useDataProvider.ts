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
} from './interfaces';
import { useClient } from './ClientProvider';

const maxAge = 10000;

const useDataProvider = () => {
  const { baseUrl, onRefreshTokenError } = useClient();
  const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const _baseUrl = baseUrl || envBaseUrl;

  //TODO
  //let user inject any http instance that match the HttpClient interface requirements
  const client: HttpClient = axiosClient;

  /**
   * Asynchronously refreshes an access token using a stored refresh token.
   * @returns A promise that resolves with the response from the token refresh request or rejects with an error.
   * @throws If an exception occurs while refreshing the token.
   */
  const refreshAccessToken = memoizee(
    async (): Promise<Token | HttpError> => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await post({
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
        onRefreshTokenError(error);
        return Promise.reject(error);
      }
    },
    { maxAge },
  );

  client.defaultConfig({
    baseURL: _baseUrl,
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

  const makeRequest = <TResponse>(requestParams: RequestParams) => {
    return client
      .executeRequest(requestParams)
      .then((res) => handleServerResponse<TResponse>(res))
      .catch((err) => handleServerError(err));
  };

  //TODO
  //if we need to normalize response no matter what client we are using or use a custom response
  //that will be more user friendly
  const handleServerResponse = <TResponse = any>(response: HttpResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { config, data, headers, status } = response;
    return data as TResponse;
  };

  //TODO
  //if we need to normalize error no matter what client we are using or use a custom error response
  //that will be more user friendly
  const handleServerError = (err: HttpError) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, response, message } = err;
    throw err;
  };

  const post = async <TRequestBody, TResponse = any>(
    requestParams: PostRequestOptions<TRequestBody>,
  ) => {
    return makeRequest<TResponse>({
      ...requestParams,
      method: 'POST',
    });
  };

  const get = async <TResponse = any>(requestParams: GetRequestOptions) => {
    return makeRequest<TResponse>({
      ...requestParams,
      method: 'GET',
    });
  };
  const put = async <TRequestBody, TResponse = any>(
    requestParams: PutRequestOptions<TRequestBody>,
  ) => {
    return makeRequest<TResponse>({
      ...requestParams,
      method: 'PUT',
    });
  };
  const patch = async <TRequestBody, TResponse = any>(
    requestParams: PatchRequestOptions<TRequestBody>,
  ) => {
    return makeRequest<TResponse>({
      ...requestParams,
      method: 'PATCH',
    });
  };
  const del = async <TResponse = any>(requestParams: DeleteRequestOptions) => {
    return makeRequest<TResponse>({
      ...requestParams,
      method: 'DELETE',
    });
  };

  return { post, get, put, patch, del };
};

export default useDataProvider;
