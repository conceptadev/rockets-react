import { AxiosRequestConfig } from 'axios';

export interface RequestParams {
  uri: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
  signal?: AbortSignal;
}

export type PostRequestOptions<TRequestBody = unknown> = Omit<
  RequestParams,
  'method'
> & {
  body?: TRequestBody;
};
export type GetRequestOptions = Omit<RequestParams, 'method'>;
export type PutRequestOptions<TRequestBody = unknown> = Omit<
  RequestParams,
  'method'
> & {
  body?: TRequestBody;
};
export type PatchRequestOptions<TRequestBody = unknown> = Omit<
  RequestParams,
  'method'
> & {
  body?: TRequestBody;
};
export type DeleteRequestOptions = Omit<RequestParams, 'method'>;

export interface HttpBaseConfigs {
  skipAuthUris: string[];
  headers: Record<string, string>;
  baseURL: string;
}

export interface HttpResponse {
  config: AxiosRequestConfig;
  data: any;
  headers: Record<string, string>;
  status: number;
}

export interface HttpError {
  response: HttpResponse;
  code: number;
  message: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface HttpMiddlewares {
  getAccessToken?(): void;
  getNewToken?(): Promise<Token | HttpError | null>;
}

export interface HttpClient {
  applyMiddleware({ getAccessToken, getNewToken }: HttpMiddlewares): void;
  defaultConfig(config: HttpBaseConfigs): void;
  executeRequest(params: RequestParams): Promise<HttpResponse>;
}

export enum AsyncStatus {
  pending = 'pending',
  success = 'success',
  error = 'error',
  idle = 'idle',
}

export interface AsyncFunction {
  (params?: any): Promise<any>;
}

export type AsyncReturnType<T extends (...args: any) => Promise<unknown>> =
  T extends (...args: any) => Promise<infer R> ? R : unknown;

type ErrorFn<TError = unknown> = (error: TError) => void;
type SuccessFn<TData = AsyncReturnType<any>> = (data: TData) => void;
type FormatFn<TData = AsyncReturnType<any>> = (data: TData) => unknown;

export interface DataProviderRequestOptions<
  TQueryFnData = unknown,
  TError = unknown,
> {
  onError?: ErrorFn<TError>;
  onSuccess?: SuccessFn<TQueryFnData>;
  onFinish?: (status: AsyncStatus) => void;
  formatData?: FormatFn<TQueryFnData>;
}

export interface RefreshTokenBody {
  refreshToken: string;
}

export interface RefreshTokenRes {
  accessToken: string;
  refreshToken: string;
}
