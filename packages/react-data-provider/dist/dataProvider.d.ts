import { RequestParams } from './interfaces';
declare const DataProvider: {
    post: (requestParams: Omit<RequestParams, 'method'>) => Promise<any>;
};
export default DataProvider;
