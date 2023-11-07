export interface RequestParams {
  uri: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: any;
  queryParams?: any;
  signal?: AbortSignal;
}

export type PostRequestOptions = Omit<RequestParams, 'method'> & { body?: any };
export type GetRequestOptions = Omit<RequestParams, 'method'>;
export type PutRequestOptions = Omit<RequestParams, 'method'> & { body?: any };
export type PatchRequestOptions = Omit<RequestParams, 'method'> & {
  body?: any;
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

export interface DataProviderRequestOptions {
  onError?: (error: unknown) => void;
  onSuccess?: (data: AsyncReturnType<any>) => void;
  onFinish?: (status: AsyncStatus) => void;
  formatData?: (data: AsyncReturnType<any>) => any;
}
