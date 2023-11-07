import { useCallback, useEffect, useState } from 'react';
import useDataProvider from './useDataProvider';
import ClientProvider from './ClientProvider';

import {
  AsyncFunction,
  DataProviderRequestOptions,
  AsyncReturnType,
  AsyncStatus,
} from './interfaces';

const useQuery = <T extends AsyncFunction>(
  asyncFn: T,
  immediate = false,
  options?: DataProviderRequestOptions,
  arg?: unknown,
) => {
  const [status, setStatus] = useState(AsyncStatus.idle);
  const [data, setData] = useState<AsyncReturnType<T>>();
  const [error, setError] = useState<unknown>();
  const [isPending, setIsPending] = useState(false);

  const { onError, onSuccess, onFinish, formatData } = options || {};

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    async (_arg?: unknown) => {
      setStatus(AsyncStatus.pending);
      setIsPending(true);
      setError(undefined);

      try {
        const response = await asyncFn(_arg);
        const formattedData = formatData ? formatData(response) : response;
        setData(formattedData);
        setStatus(AsyncStatus.success);
        onSuccess?.(formattedData);
        onFinish?.(AsyncStatus.success);
      } catch (err) {
        setError(err);
        setStatus(AsyncStatus.error);
        onError?.(err);
        onFinish?.(AsyncStatus.error);
      } finally {
        setIsPending(false);
      }
    },
    [asyncFn],
  );

  const refresh = useCallback(() => execute(arg), [execute]);

  useEffect(() => {
    if (immediate) {
      execute(arg);
    }
  }, [immediate]);

  return { execute, status, isPending, data, error, refresh };
};

export { ClientProvider, useQuery };

export default useDataProvider;
