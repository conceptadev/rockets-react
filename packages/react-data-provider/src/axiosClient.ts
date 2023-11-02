import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  HttpBaseConfigs,
  HttpClient,
  HttpMidlewares,
  PostRequestOptions,
  GetRequestOptions,
  PutRequestOptions,
  PatchRequestOptions,
  DeleteRequestOptions,
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
  applyMiddleware: (midlewares: HttpMidlewares) => {
    if (!axiosInstance) {
      throw 'You need to create a http client instance with default config';
    }

    axiosInstance.interceptors.request.use(
      async (config): Promise<AxiosRequestConfig> => {
        if (
          config.url &&
          defaultConfigs.skipAuthUris.findIndex((uri) =>
            config?.url?.includes(uri),
          ) == -1
        ) {
          const accessToken = midlewares?.getAccessToken?.();
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      async (error): Promise<AxiosRequestConfig> => {
        if (error.status !== 401) {
          return Promise.reject(error);
        }

        //skip refresh

        const accessToken = await midlewares?.getNewToken?.();

        error.response.config.headers.Authorization = `Bearer ${accessToken}`;

        return axios(error.response.config);
      },
    );
  },
  defaultConfig: (defaultConfig: HttpBaseConfigs) => {
    axiosInstance = axios.create(defaultConfig);
    defaultConfigs = defaultConfig;
  },
};

export default axiosClient;
