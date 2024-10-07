import { PostRequestOptions, GetRequestOptions, PutRequestOptions, PatchRequestOptions, DeleteRequestOptions } from './interfaces';
declare const useDataProvider: () => {
    post: <TRequestBody = unknown, TQueryData = unknown>(requestParams: PostRequestOptions<TRequestBody>) => Promise<TQueryData>;
    get: <TQueryData_1 = unknown>(requestParams: GetRequestOptions) => Promise<TQueryData_1>;
    put: <TRequestBody_1 = unknown, TQueryData_2 = unknown>(requestParams: PutRequestOptions<TRequestBody_1>) => Promise<TQueryData_2>;
    patch: <TRequestBody_2 = unknown, TQueryData_3 = unknown>(requestParams: PatchRequestOptions<TRequestBody_2>) => Promise<TQueryData_3>;
    del: <TQueryData_4 = unknown>(requestParams: DeleteRequestOptions) => Promise<TQueryData_4>;
};
export default useDataProvider;
