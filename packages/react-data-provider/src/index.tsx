import { useCallback, useEffect, useState } from 'react';
import useDataProvider from './useDataProvider';
import ClientProvider from './ClientProvider';

import {
  AsyncFunction,
  DataProviderRequestProps,
  AsyncReturnType,
  AsyncStatus,
} from './interfaces';

export const useQuery = <T extends AsyncFunction>(
  asyncFn: T,
  immediate = false,
  callbacks?: DataProviderRequestProps,
  arg?: unknown,
) => {
  const [status, setStatus] = useState(AsyncStatus.idle);
  const [data, setData] = useState<AsyncReturnType<T>>();
  const [error, setError] = useState<unknown>();
  const [isPending, setIsPending] = useState(false);

  const { onError, onSuccess, onFinish } = callbacks;

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
        setData(response);
        setStatus(AsyncStatus.success);

        if (onSuccess) {
          onSuccess(response);
        }
        if (onFinish) {
          onFinish(AsyncStatus.success);
        }
      } catch (err) {
        setError(err);
        setStatus(AsyncStatus.error);

        if (onError) {
          onError(err);
        }
        if (onFinish) {
          onFinish(AsyncStatus.error);
        }
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

export { ClientProvider };

export default useDataProvider;
