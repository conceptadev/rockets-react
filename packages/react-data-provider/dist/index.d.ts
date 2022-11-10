import DataProvider from './dataProvider';
import { AsyncFunction, DataProviderRequestProps, ArgumentsType, AsyncReturnType, AsyncStatus } from "./interfaces";
export declare const useDataProvider: <T extends AsyncFunction>(asyncFn: T, immediate?: boolean, callbacks?: DataProviderRequestProps, args?: ArgumentsType<T>) => {
    execute: (args?: ArgumentsType<T>) => Promise<void>;
    status: AsyncStatus;
    isPending: boolean;
    data: AsyncReturnType<T>;
    error: any;
    refresh: () => Promise<void>;
};
export default DataProvider;
