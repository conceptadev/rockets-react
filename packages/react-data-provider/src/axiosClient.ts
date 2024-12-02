import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  HttpBaseConfigs,
  HttpClient,
  PostRequestOptions,
  GetRequestOptions,
  PutRequestOptions,
  PatchRequestOptions,
  DeleteRequestOptions,
  HttpMiddlewares,
} from './interfaces';

let axiosInstance: AxiosInstance;
let defaultConfigs: HttpBaseConfigs;

const axiosClient: HttpClient = {
  executeRequest: (
    configs:
      | PostRequestOptions
      | GetRequestOptions
      | PutRequestOptions
      | PatchRequestOptions
      | DeleteRequestOptions,
  ) => {
    if (!axiosInstance) {
      throw 'You need to create a http client instance with default config';
    }

    return axiosInstance
      .request({
        ...configs,
        url: configs.uri,
        params: configs.queryParams,
        signal: configs.signal,
        ...('body' in configs && { data: configs.body }),
        responseType: configs?.responseType,
      })
      .then((response) => {
        const { config, data, headers, status } = response;
        return {
          config,
          data,
          headers,
          status,
        };
      })
      .catch((error) => {
        throw {
          code: error.code,
          message: error.message,
          response: error.response,
        };
      });
  },
  applyMiddleware: (middlewares: HttpMiddlewares) => {
    if (!axiosInstance) {
      throw 'You need to create a http client instance with default config';
    }

    axiosInstance.interceptors.request.use(
      async (config) => {
        if (
          config.url &&
          defaultConfigs.skipAuthUris.findIndex((uri) =>
            config?.url?.includes(uri),
          ) === -1
        ) {
          const accessToken = middlewares?.getAccessToken?.();
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }

          return Promise.resolve(config);
        }
        return Promise.resolve(config);
      },
      async (error): Promise<AxiosRequestConfig> => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error?.config;

        if (
          config.url &&
          defaultConfigs.skipAuthUris.findIndex((uri) =>
            config?.url?.includes(uri),
          ) === -1
        ) {
          if (error?.response?.status === 401 && !config?._sent) {
            config._sent = true;

            const response = await middlewares.getNewToken();

            if (
              response &&
              'accessToken' in response &&
              'refreshToken' in response
            ) {
              if (config.headers) {
                config.headers.Authorization = `Bearer ${response.accessToken}`;
              }

              return axiosInstance(config);
            }

            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );
  },
  defaultConfig: (defaultConfig: HttpBaseConfigs) => {
    axiosInstance = axios.create(defaultConfig);
    defaultConfigs = defaultConfig;
  },
};

export default axiosClient;
