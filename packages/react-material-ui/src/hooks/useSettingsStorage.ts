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

  const settingsItem = cacheList.find(
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

const handlePageSettingsUpdate = (data: CacheResponse) => {
  localStorage.setItem(data.type, JSON.stringify(data));
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
    {
      onSuccess: (data: CacheResponse) => handlePageSettingsUpdate(data),
    },
  );

  const { execute: updateCache } = useQuery(
    (cache: string) =>
      patch({
        uri: `/cache/user/${settingsState.id}`,
        body: {
          key,
          type,
          assignee,
          data: cache,
        },
      }),
    false,
    {
      onSuccess: (data: CacheResponse) => handlePageSettingsUpdate(data),
    },
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

  const [settingsState, setSettingsState] = useState<CacheState>({
    id: '',
    dateCreated: '',
    dateUpdated: '',
    dateDeleted: '',
    version: 1,
    key: key,
    data,
    type: type,
    assignee: assignee,
  });

  const setSettings = (list: ListItem[]) => {
    setSettingsState({
      ...settingsState,
      data: list,
    });

    updateCache(JSON.stringify(list));
  };

  useEffect(() => {
    setSettingsState(
      getPageSettings({ key, type, assignee, cacheList: cachedData || [] }),
    );
  }, [cachedData]);

  console.log('SETTINGS: ', settingsState);

  return { settings: settingsState.data, setSettings };
};
