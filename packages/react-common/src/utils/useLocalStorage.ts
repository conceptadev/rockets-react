import type { Dispatch, SetStateAction } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export declare type LocalStorageState<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  () => void,
];

function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
): LocalStorageState<T> {
  const [data, setData, { removeItem }] = useLocalStorageState<T>(key, {
    defaultValue,
  });

  return [data, setData, removeItem];
}

export default useLocalStorage;
