import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import debounce from 'lodash/debounce';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { useAuth } from '@concepta/react-auth-provider';

/**
 * Type of the cache assignee info, with id being an user id.
 */
type Assignee = {
  id: string;
};

/**
 * Type of the orderable items used in the OrderableDropDown component.
 *
 * @see {@link OrderableDropDown}
 */
type ListItem = {
  id: string;
  label: string;
  hide?: boolean;
};

/**
 * Type of the object containing info related to cache, orderable items and localStorage.
 */
type Settings = {
  key: string;
  assignee: Assignee;
  type: string;
  data: ListItem[];
};

/**
 * Common data returned by the cache module endpoints.
 */
type CacheResponse = {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted?: string;
  version: number;
  key: string;
  type: string;
  assignee: Assignee;
  data: string;
};

/**
 * Type of useSettingsStorage hook props.
 */
type Props = {
  setListCallback?: (list?: Settings['data']) => void;
  cacheApiUri?: string;
} & Omit<Settings, 'assignee'>;

/**
 * Transforms the BE stringified data into a string that can
 * be parsed via the JSON.parse method.
 *
 * @param data - Stringified data array returned from the backend.
 * @returns Parseable settings array string.
 */
const parseDataStringToSettings = (data: string) => {
  return JSON.parse(data.replace(/'/g, '"'));
};

/**
 * Transforms the string returned from JSON.stringify into
 * one that can be accepted by the BE.
 *
 * @param data - Stringified settings array.
 * @returns Stringified array that can be read by BE endpoints.
 */
const parseSettingsToDataString = (data: string) => {
  return data.replace(/"/g, "'");
};

/**
 * Default delay time for consecutive updateCache calls
 */
const DEBOUNCE_TIME_IN_MILLISECONDS = 1500;

/**
 * Get an array of settings from localStorage based on key, type and assignee.
 *
 * @returns An array of orderable items to be set on hook state or returned to
 * parent component.
 */
const getSettingsFromStorage = (params: Omit<Settings, 'data'>) => {
  const storageItem = JSON.parse(localStorage.getItem(params.type));

  if (!storageItem) {
    return [];
  }

  const settingsItem = storageItem.find(
    ({ assignee, key }: Settings) =>
      assignee.id === params.assignee.id && key === params.key,
  );

  return settingsItem ? settingsItem.data : [];
};

/**
 * Get an array of settings from a list returned by the API
 * based on key, type and assignee.
 *
 * @returns An array of orderable items to be set on hook state or returned to
 * parent component.
 */
const getSettingsFromCacheList = (
  params: Omit<Settings, 'data'> & { cacheList: CacheResponse[] },
) => {
  const settingsItem = params.cacheList.find(
    (item) =>
      item.key === params.key &&
      item.type === params.type &&
      item.assignee.id === params.assignee.id,
  );

  if (!settingsItem) {
    return null;
  }

  return {
    ...settingsItem,
    data: parseDataStringToSettings(settingsItem.data),
  };
};

/**
 * Updates settings on localStorage based on key, type and assignee.
 */
const updateSettingsStorage = (params: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(params.type));

  if (!storageItem) {
    localStorage.setItem(params.type, JSON.stringify([params]));
    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) =>
      item.assignee.id === params.assignee.id && item.key === params.key,
  );

  if (settingsItemIndex > -1) {
    storageItem[settingsItemIndex] = params;
  } else {
    storageItem.push(params);
  }

  localStorage.setItem(params.type, JSON.stringify(storageItem));
};

/**
 * Deletes settings on localStorage based on key, type and assignee.
 */
const deleteSettingsStorage = (params: Omit<Settings, 'data'>) => {
  const storageItem = JSON.parse(localStorage.getItem(params.type));

  if (!storageItem || !storageItem?.length) {
    return;
  }

  let updatedStorageItem = [...storageItem];

  const settingsItemIndex = storageItem.findIndex(
    ({ assignee, key }: Settings) =>
      assignee.id === params.assignee.id && key === params.key,
  );

  if (settingsItemIndex > -1) {
    updatedStorageItem = storageItem.splice(settingsItemIndex, 1);
  }

  localStorage.setItem(params.type, JSON.stringify(updatedStorageItem));
};

/**
 * Hook for managing fetch/update state and cache for the OrderableDropDown
 * component. The local storage and cache module are used for this, with local storage
 * being the primary source of information. If settings are present in local storage, BE
 * data is not used. If not, a lookup is performed in the api to check if there's cache of
 * the type passed via props.
 *
 * @returns Object containing the settings array and the updateSettings and clearSettings methods.
 */
export const useSettingsStorage = (props: Props) => {
  const [cacheId, setCacheId] = useState<CacheResponse['id']>('');
  const [settings, setSettings] = useState<Settings['data']>([]);

  if (!props.type) {
    return {
      settings,
      setSettings,
      clearSettings: () => null,
    };
  }

  const auth = useAuth();
  const pathname = usePathname();

  const { get, put, del } = useDataProvider();

  const settingsKey = props.key || pathname;
  const assignee = {
    id: (auth?.user as { id: string })?.id ?? '',
  };

  const cacheConfig = {
    key: settingsKey,
    type: props.type,
    assignee,
  };

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      put({
        uri: `${props.cacheApiUri}/${crypto.randomUUID()}`,
        body: {
          ...cacheConfig,
          data: cache,
        },
      }),
    false,
    {
      onSuccess: (res: CacheResponse) => setCacheId(res.id),
    },
  );

  const { execute: updateCache } = useQuery(
    (list: Settings['data']) =>
      put({
        uri: `${props.cacheApiUri}/${cacheId}`,
        body: {
          ...cacheConfig,
          data: parseSettingsToDataString(JSON.stringify(list)),
        },
      }),
    false,
    {
      onSuccess: (res: CacheResponse) => setCacheId(res.id),
    },
  );

  const { execute: deleteCache } = useQuery(
    () => del({ uri: `${props.cacheApiUri}/${cacheId}` }),
    false,
    { onSuccess: () => setCacheId('') },
  );

  const { execute: fetchSettingsCache } = useQuery(
    () => get({ uri: props.cacheApiUri }),
    false,
    {
      onSuccess: (fetchedData: CacheResponse[]) => {
        const storageData = getSettingsFromStorage(cacheConfig);
        const cachedSettings = getSettingsFromCacheList({
          ...cacheConfig,
          cacheList: fetchedData,
        });

        if (!cachedSettings) {
          createCache(parseSettingsToDataString(JSON.stringify(props.data)));
          return;
        }

        if (cachedSettings) {
          setCacheId(cachedSettings.id);

          if (!storageData.length) {
            setSettings(cachedSettings.data);
            props.setListCallback(cachedSettings.data);
          }
        }
      },
    },
  );

  const debouncedCacheUpdate = debounce(
    (items: Settings['data']) => updateCache(items),
    DEBOUNCE_TIME_IN_MILLISECONDS,
  );

  /**
   * Updates localStorage entry related to an orderable list.
   * If useSettingsStorage cacheApiUri prop is valid, also updates cache api entry.
   *
   * @param items - array of items that composes the orderable list.
   */
  const updateSettings = (items: Settings['data']) => {
    setSettings(items);
    updateSettingsStorage({
      ...cacheConfig,
      data: items,
    });

    if (props.cacheApiUri && cacheId) {
      debouncedCacheUpdate(items);
    }
  };

  /**
   * Deletes localStorage entry related to an orderable list.
   * If useSettingsStorage cacheApiUri prop is valid, also deletes cache api entry.
   */
  const clearSettings = () => {
    deleteSettingsStorage(cacheConfig);

    if (props.cacheApiUri && cacheId) {
      deleteCache();
    }
  };

  useEffect(() => {
    const storageData = getSettingsFromStorage(cacheConfig);

    if (storageData.length) {
      props.setListCallback(storageData);
      setSettings(storageData);
    }

    if (props.cacheApiUri) {
      fetchSettingsCache();
    }
  }, []);

  return { settings, updateSettings, clearSettings };
};
