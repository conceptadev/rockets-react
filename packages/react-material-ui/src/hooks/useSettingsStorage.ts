import type { Dispatch, SetStateAction } from 'react';

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

type Props = {
  setListCallback?: (list?: CacheState['data']) => void;
} & Settings;

const baseUri = '/cache/user';

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

const parseDataString = (data: string) => {
  return JSON.parse(data.replace(/'/g, '"'));
};

export const getSettingsFromStorage = ({
  key,
  type,
  assignee,
  data,
}: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  if (!storageItem) {
    return data;
  }

  const settingsItem = storageItem.find(
    (item: Settings) => item.assignee.id === assignee.id && item.key === key,
  );

  return settingsItem?.data || data;
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
    data: parseDataString(settingsItem.data),
  };
};

export const handlePageSettingsUpdate = ({
  key,
  type,
  assignee,
  data,
}: Settings) => {
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

export const useSettingsStorage = ({
  key,
  type,
  assignee,
  data,
  setListCallback,
}: Props) => {
  const [settingsCache, setSettingsCache] =
    useState<CacheState>(initialSettingsState);
  const [settings, setSettings] = useState<CacheState['data']>(() => {
    return getSettingsFromStorage({ key, type, assignee, data });
  });

  const { get, post, patch } = useDataProvider();

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      post({
        uri: baseUri,
        body: {
          key,
          type,
          assignee,
          data: cache,
        },
      }),
    false,
    {
      onSuccess: (creationData: CacheResponse) =>
        setSettingsCache({
          ...creationData,
          data: parseDataString(creationData.data),
        }),
    },
  );

  const { execute: updateCache } = useQuery(
    (cache: CacheState) =>
      patch({
        uri: `${baseUri}/${settingsCache.id}`,
        body: {
          ...cache,
          data: JSON.stringify(cache.data),
        },
      }),
    false,
    {
      onSuccess: (updateData: CacheResponse) =>
        setSettingsCache({
          ...updateData,
          data: parseDataString(updateData.data),
        }),
    },
  );

  useQuery(() => get({ uri: baseUri }), true, {
    onSuccess: (fetchedData: CacheResponse[]) => {
      if (!fetchedData.length) {
        createCache(JSON.stringify(data));
      } else {
        setSettingsCache(
          getSettingsFromCacheList({
            key,
            type,
            assignee,
            cacheList: fetchedData,
          }),
        );
      }
    },
  });

  const updateSettings = (list: ListItem[]) => {
    setSettings(list);
    updateCache({
      ...settingsCache,
      data: list,
    });
  };

  useEffect(() => {
    handlePageSettingsUpdate({
      key,
      type,
      assignee,
      data: settings,
    });
  }, [key, settings]);

  useEffect(() => {
    if (settings.length) {
      setListCallback(settings);
    }
  }, []);

  useEffect(() => {
    if (!settings.length && settingsCache.data.length) {
      setListCallback(settingsCache.data);
      handlePageSettingsUpdate({
        key,
        type,
        assignee,
        data: settingsCache.data,
      });
    }
  }, [settingsCache]);

  return { settings, setSettings, updateSettings };
};
