export interface RequestParams {
  uri: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: any;
  queryParams?: any;
  signal?: AbortSignal;
}

export type PostRequestOptions<TRequestBody = any> = Omit<
  RequestParams,
  'method'
> & {
  body?: TRequestBody;
};
export type GetRequestOptions = Omit<RequestParams, 'method'>;
export type PutRequestOptions<TRequestBody = any> = Omit<
  RequestParams,
  'method'
> & {
  body?: TRequestBody;
};
export type PatchRequestOptions<TRequestBody = any> = Omit<
  RequestParams,
  'method'
> & {
  body?: TRequestBody;
};
export type DeleteRequestOptions = Omit<RequestParams, 'method'>;

export interface HttpBaseConfigs {
  skipAuthUris: string[];
  headers: any;
  baseURL: string;
}

export interface HttpResponse {
  config: any;
  data: any;
  headers: any;
  status: any;
}

export interface HttpError {
  response: HttpResponse;
  code: any;
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

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

type ErrorFn<TError = unknown> = (error: TError) => void;
type SuccessFn<TData = AsyncReturnType<any>> = (data: TData) => void;
type FormatFn<TData = AsyncReturnType<any>> = (data: TData) => any;

export interface DataProviderRequestOptions<
  TQueryFnData = any,
  TError = unknown,
> {
  onError?: ErrorFn<TError>;
  onSuccess?: SuccessFn<TQueryFnData>;
  onFinish?: (status: AsyncStatus) => void;
  formatData?: FormatFn<TQueryFnData>;
}
