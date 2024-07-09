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

const getPageSettings = ({
  key,
  assignee,
  type,
  cacheList,
}: Omit<Settings, 'data'> & { cacheList: CacheResponse[] }) => {
  console.log('cache list: ', cacheList);

  const source = cacheList.length
    ? cacheList
    : JSON.parse(localStorage.getItem(type));

  const settingsItem = source.find(
    (item) =>
      item.key === key &&
      item.type === type &&
      item.assignee.id === assignee.id,
  );

  console.log('settings item: ', settingsItem);

  return {
    ...settingsItem,
    data: JSON.parse(settingsItem.data),
  };
};

const handlePageSettingsUpdate = ({ key, type, assignee, data }: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  const newSettings = {
    key,
    type,
    assignee,
    data,
  };

  if (!storageItem) {
    localStorage.setItem(key, JSON.stringify([newSettings]));
    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) =>
      item.assignee.id === assignee.id &&
      item.key === key &&
      item.type === type,
  );

  if (settingsItemIndex > -1) {
    storageItem[settingsItemIndex] = newSettings;
  } else {
    storageItem.push(newSettings);
  }

  localStorage.setItem(key, JSON.stringify(storageItem));
};

export const useSettingsStorage = ({ key, assignee, type, data }: Settings) => {
  const { get, post, patch } = useDataProvider();

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      post({
        uri: `/cache/user`,
        body: {
          key,
          type,
          assignee,
          data: cache,
        },
      }),
    false,
  );

  const { execute: updateCache } = useQuery(
    (cache: string) =>
      patch({
        uri: `/cache/user/${settingsCache.id}`,
        body: {
          key,
          type,
          assignee,
          data: cache,
        },
      }),
    false,
  );

  const { data: cachedData } = useQuery(
    () => get({ uri: '/cache/user' }),
    true,
    {
      onSuccess: (fetchedData: CacheResponse[]) => {
        if (!fetchedData.length) {
          createCache(JSON.stringify(data));
        }
      },
    },
  );

  // const [settingsCache, setSettingsCache] = useState<CacheState>({
  //   id: '',
  //   dateCreated: '',
  //   dateUpdated: '',
  //   dateDeleted: '',
  //   version: 1,
  //   key: key,
  //   data: [],
  //   type: type,
  //   assignee: assignee,
  // });

  const [settingsCache, setSettingsCache] = useState<CacheState>(() => {
    return getPageSettings({
      key,
      type,
      assignee,
      cacheList: cachedData as CacheResponse[],
    });
  });

  const setSettings = (list: ListItem[]) => {
    setSettingsCache({
      ...settingsCache,
      data: list,
    });

    updateCache(JSON.stringify(list));

    handlePageSettingsUpdate({ key, type, assignee, data: list });
  };

  console.log('SETTINGS: ', settingsCache);

  return { settings: settingsCache.data, setSettings };
};
