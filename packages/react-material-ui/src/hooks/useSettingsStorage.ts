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
type CommonCacheInfo = {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted?: string;
  version: number;
  key: string;
  type: string;
  assignee: Assignee;
};

/**
 * Extension of the common data returned by the cache module endpoints,
 * including the data attribute as a string.
 */
type CacheResponse = {
  data: string;
} & CommonCacheInfo;

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
const getSettingsFromStorage = ({
  key,
  type,
  assignee,
}: Omit<Settings, 'data'>) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  if (!storageItem) {
    return [];
  }

  const settingsItem = storageItem.find(
    (item: Settings) => item.assignee.id === assignee.id && item.key === key,
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
const getSettingsFromCacheList = ({
  key,
  type,
  assignee,
  cacheList,
}: Omit<Settings, 'data'> & { cacheList: CacheResponse[] }) => {
  const settingsItem = cacheList.find(
    (item) =>
      item.key === key &&
      item.type === type &&
      item.assignee.id === assignee.id,
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
const updateSettingsStorage = ({ key, type, assignee, data }: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  const newSettings = {
    key,
    assignee,
    data,
  };

  if (!storageItem) {
    localStorage.setItem(type, JSON.stringify([newSettings]));
    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) => item.assignee.id === assignee.id && item.key === key,
  );

  if (settingsItemIndex > -1) {
    storageItem[settingsItemIndex] = newSettings;
  } else {
    storageItem.push(newSettings);
  }

  localStorage.setItem(type, JSON.stringify(storageItem));
};

/**
 * Deletes settings on localStorage based on key, type and assignee.
 */
const deleteSettingsStorage = ({
  key,
  type,
  assignee,
}: Omit<Settings, 'data'>) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  if (!storageItem || !storageItem?.length) {
    return;
  }

  let updatedStorageItem = [...storageItem];

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) => item.assignee.id === assignee.id && item.key === key,
  );

  if (settingsItemIndex > -1) {
    updatedStorageItem = storageItem.splice(settingsItemIndex, 1);
  }

  localStorage.setItem(type, JSON.stringify(updatedStorageItem));
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
export const useSettingsStorage = ({
  key,
  type,
  data,
  setListCallback,
  cacheApiUri,
}: Props) => {
  const [cacheId, setCacheId] = useState<CommonCacheInfo['id']>('');
  const [settings, setSettings] = useState<Settings['data']>([]);

  if (!type) {
    return {
      settings,
      setSettings,
      clearSettings: () => null,
    };
  }

  const auth = useAuth();
  const pathname = usePathname();

  const { get, put, del } = useDataProvider();

  const settingsKey = key || pathname;
  const assignee = {
    id: (auth?.user as { id: string })?.id ?? '',
  };

  const cacheConfig = {
    key: settingsKey,
    type,
    assignee,
  };

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      put({
        uri: `${cacheApiUri}/${crypto.randomUUID()}`,
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
        uri: `${cacheApiUri}/${cacheId}`,
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
    () => del({ uri: `${cacheApiUri}/${cacheId}` }),
    false,
    { onSuccess: () => setCacheId('') },
  );

  const { execute: fetchSettingsCache } = useQuery(
    () => get({ uri: cacheApiUri }),
    false,
    {
      onSuccess: (fetchedData: CacheResponse[]) => {
        const storageData = getSettingsFromStorage(cacheConfig);
        const cachedSettings = getSettingsFromCacheList({
          ...cacheConfig,
          cacheList: fetchedData,
        });

        if (!cachedSettings) {
          createCache(parseSettingsToDataString(JSON.stringify(data)));
          return;
        }

        if (cachedSettings) {
          setCacheId(cachedSettings.id);

          if (!storageData.length) {
            setSettings(cachedSettings.data);
            setListCallback(cachedSettings.data);
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

    if (cacheApiUri && cacheId) {
      debouncedCacheUpdate(items);
    }
  };

  /**
   * Deletes localStorage entry related to an orderable list.
   * If useSettingsStorage cacheApiUri prop is valid, also deletes cache api entry.
   */
  const clearSettings = () => {
    deleteSettingsStorage(cacheConfig);

    if (cacheApiUri && cacheId) {
      deleteCache();
    }
  };

  useEffect(() => {
    const storageData = getSettingsFromStorage(cacheConfig);

    if (storageData.length) {
      setListCallback(storageData);
      setSettings(storageData);
    }

    if (cacheApiUri) {
      fetchSettingsCache();
    }
  }, []);

  return { settings, updateSettings, clearSettings };
};
