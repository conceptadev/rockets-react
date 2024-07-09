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

type CacheResponse = {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted?: string;
  version: number;
  key: string;
  data: string;
  type: string;
  assignee: Assignee;
};

type CacheState = {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted?: string;
  version: number;
  key: string;
  data: ListItem[];
  type: string;
  assignee: Assignee;
};

export const getPageSettings = ({
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

export const useSettingsStorage = ({ key, assignee, type, data }: Settings) => {
  const [settings, setSettings] = useState<CacheState>({
    id: '',
    dateCreated: '',
    dateUpdated: '',
    dateDeleted: '',
    version: 1,
    key: key,
    data: [],
    type: type,
    assignee: assignee,
  });

  const { get, post, patch } = useDataProvider();

  const { data: cachedData } = useQuery(
    () => get({ uri: '/cache/user' }),
    true,
    {
      onSuccess: (fetchedData) =>
        setSettings(
          getPageSettings({
            key,
            type,
            assignee,
            cacheList: fetchedData as CacheResponse[],
          }),
        ),
    },
  );

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
      onSuccess: (creationData: CacheResponse) =>
        setSettings({
          ...creationData,
          data: JSON.parse(creationData.data),
        }),
    },
  );

  const { execute: updateCache } = useQuery(
    (cache: Record<string, unknown>) =>
      patch({
        uri: `/cache/user/${settings.id}`,
        body: {
          key,
          type,
          assignee,
          data: cache,
        },
      }),
    false,
    {
      onSuccess: (updateData: CacheResponse) =>
        setSettings({
          ...updateData,
          data: JSON.parse(updateData.data),
        }),
    },
  );

  const changeSettings = (list: ListItem[]) =>
    setSettings({
      ...settings,
      data: list,
    });

  useEffect(() => {
    const cached = (cachedData || []) as CacheResponse[];

    if (!cached.length && !settings.data.length && data.length) {
      createCache(JSON.stringify(data));
    }
  }, [cachedData, data]);

  console.log('SETTINGS: ', settings);

  return { cachedSettings: settings.data, changeSettings };
};
