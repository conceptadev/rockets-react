import { useCallback, useEffect, useState } from "react";
import DataProvider from './dataProvider';
import { AsyncFunction, DataProviderRequestProps, ArgumentsType, AsyncReturnType, AsyncStatus } from "./interfaces";

export const useDataProvider = <T extends AsyncFunction>(
  asyncFn: T,
  immediate = false,
  callbacks?: DataProviderRequestProps,
  args?: ArgumentsType<T>
) => {
  const [status, setStatus] = useState(AsyncStatus.idle);
  const [data, setData] = useState<AsyncReturnType<T>>();
  const [error, setError] = useState<any>();
  const [isPending, setIsPending] = useState(false);

  const {onError, onSuccess, onFinish} = callbacks;

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    async (args?: ArgumentsType<T>) => {
      
      console.log({args});

      setStatus(AsyncStatus.pending);
      setIsPending(true);

      setError(undefined);

      try {
        const response = await asyncFn(args);
        setData(response);
        setStatus(AsyncStatus.success);

        if(onSuccess) {
          onSuccess(response)
        }
        if(onFinish) {
          onFinish(AsyncStatus.success)
        }
      } catch (err) {
        setError(err);
        setStatus(AsyncStatus.error);
        
        if(onError){
          onError(err);
        }
        if(onFinish) {
          onFinish(AsyncStatus.error)
        }
      } finally {
        setIsPending(false);
      }
    },
    [asyncFn]
  );

  const refresh = useCallback(() => execute(args), [execute]);

  useEffect(() => {
    if (immediate) {
      execute(args);
    }
  }, [immediate]);

  return { execute, status, isPending, data, error, refresh };
};

export default DataProvider;


