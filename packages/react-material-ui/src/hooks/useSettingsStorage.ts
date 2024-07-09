import { useState, useEffect } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

type Assignee = {
  id: string;
};

type ListItem = {
  id: string;
  hide?: boolean;
};

type Settings = {
  key: string;
  assignee: Assignee;
  type: string;
  data: ListItem[];
};

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

type CacheResponse = {
  data: string;
} & CommonCacheInfo;

type CacheState = {
  data: ListItem[];
} & CommonCacheInfo;

const initialSettingsState = {
  id: '',
  dateCreated: '',
  dateUpdated: '',
  dateDeleted: '',
  version: 1,
  key: '',
  data: [],
  type: '',
  assignee: { id: '' },
};

const getSettingsFromStorage = (type: CommonCacheInfo['type']) => {
  return JSON.parse(localStorage.getItem(type));
};

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

  console.log('settings item: ', settingsItem);

  if (!settingsItem) {
    return null;
  }

  return {
    ...settingsItem,
    data: JSON.parse(settingsItem.data),
  };
};

const updateStorageSettings = ({ key, type, assignee, data }: Settings) => {
  const newSettings = {
    key,
    type,
    assignee,
    data,
  };

  localStorage.setItem(type, JSON.stringify(newSettings));
};

export const useSettingsStorage = (
  props: Settings,
): [CacheState['data'], (list: ListItem[]) => void] => {
  const [settings, setSettings] = useState<CacheState>(initialSettingsState);

  const { get, post, patch } = useDataProvider();

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      post({
        uri: `/cache/user`,
        body: {
          ...props,
          data: cache,
        },
      }),
    false,
  );

  const { execute: updateCache } = useQuery(
    (cache: CacheState) =>
      patch({
        uri: `/cache/user/${settings.id}`,
        body: {
          ...cache,
          data: JSON.stringify(cache.data),
        },
      }),
    false,
  );

  const { data: cachedData, isPending: isLoadingCachedData } = useQuery(
    () => get({ uri: '/cache/user' }),
    true,
    {
      onSuccess: (fetchedData: CacheResponse[]) => {
        if (!fetchedData.length) {
          createCache(JSON.stringify(props.data));
        }
      },
    },
  );

  const handleSettingsChange = (data: ListItem[]) => {
    setSettings({
      ...settings,
      data,
    });

    updateCache({
      ...settings,
      data,
    });
  };

  useEffect(() => {
    const storageState = getSettingsFromStorage(props.type);
    console.log('storage state: ', storageState);
    setSettings(storageState);
  }, []);

  useEffect(() => {
    if (!isLoadingCachedData && cachedData.length && !settings.data.length) {
      const cachedSettings = getSettingsFromCacheList({
        ...settings,
        cacheList: cachedData,
      });

      console.log('cached settings: ', cachedSettings);
    }
  }, [isLoadingCachedData, cachedData, settings.data]);

  useEffect(() => {
    updateStorageSettings(settings);
  }, [settings]);

  return [settings.data, handleSettingsChange];
};
