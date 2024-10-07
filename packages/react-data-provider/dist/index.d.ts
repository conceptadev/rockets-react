import useDataProvider from './useDataProvider';
import ClientProvider from './ClientProvider';
import { AsyncFunction, DataProviderRequestOptions, AsyncStatus } from './interfaces';
declare const useQuery: <TQueryData, TError = unknown>(asyncFn: AsyncFunction, immediate?: boolean, options?: DataProviderRequestOptions<TQueryData, TError>, arg?: unknown) => {
    execute: (_arg?: unknown) => Promise<void>;
    status: AsyncStatus;
    isPending: boolean;
    data: TQueryData;
    error: TError;
    refresh: () => Promise<void>;
};
export { ClientProvider, useQuery };
export default useDataProvider;
