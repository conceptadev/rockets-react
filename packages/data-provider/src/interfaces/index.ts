export interface RequestParams {
  uri: string;
  method: 'POST' | 'GET';
  body?: any;
  headers?: any;
  queryParams?: any;
}

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

export interface HttpMidlewares {
  getAccessToken?(): void;
  getNewToken?(): void;
}

export interface HttpClient {
  applyMiddleware({ getAccessToken, getNewToken }: HttpMidlewares): void;
  defaultConfig(config: HttpBaseConfigs): void;
  executeRequest(params: RequestParams): Promise<HttpResponse>;
}
