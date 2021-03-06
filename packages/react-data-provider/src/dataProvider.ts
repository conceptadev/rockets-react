import axiosClient from './axiosClient';
import {
  HttpClient,
  HttpError,
  HttpResponse,
  RequestParams,
} from './interfaces';

const apiUrl = 'http://localhost:3001';

//TODO
//let user inject any http instance that match the HttpClient interface requirements
const client: HttpClient = axiosClient;

client.defaultConfig({
  baseURL: apiUrl,
  skipAuthUris: ['login', 'refresh'],
  headers: {
    'Content-Type': 'application/json',
  },
});

client.applyMiddleware({
  getAccessToken: () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return accessToken;
    } else {
      //TODO
      //redirect to login
    }
  },
  getNewToken: () => {
    //TODO
    // const makeRequest = localStorage.getItem("refresh_token");
    // if(refreshToken){
    //   return refreshToken;
    // }else{
    //   //redirect to login
    // }
  },
});

const makeRequest = (requestParams: RequestParams) => {
  return client
    .executeRequest(requestParams)
    .then((res) => handleServerResponse(res))
    .catch((err) => handleServerError(err));
};

//TODO
//if we need to normalize response no matter what client we are using or use a custom response
//that will be more user friendly
const handleServerResponse = (response: HttpResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { config, data, headers, status } = response;
  return data;
};

//TODO
//if we need to normalize error no matter what client we are using or use a custom error response
//that will be more user friendly
const handleServerError = (err: HttpError) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { code, response, message } = err;
  throw err;
};

const DataProvider = {
  post: async (requestParams: Omit<RequestParams, 'method'>) => {
    return makeRequest({
      ...requestParams,
      method: 'POST',
    });
  },
};

export default DataProvider;
