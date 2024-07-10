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
  callback?: () => void;
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

  const regex = /'/g;
  const char = '"';
  const data = JSON.parse(settingsItem.data.replace(regex, char));

  return {
    ...settingsItem,
    data,
  };
};

const updateStorageSettings = (
  type: CommonCacheInfo['type'],
  cacheState: CacheState,
) => {
  localStorage.setItem(type, JSON.stringify(cacheState));
};

export const useSettingsStorage = (
  props: Props,
): [CacheState['data'], (list: ListItem[]) => void] => {
  const [settings, setSettings] = useState<CacheState>(initialSettingsState);

  const { get, post, patch } = useDataProvider();

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      post({
        uri: baseUri,
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
        uri: `${baseUri}/${settings.id}`,
        body: {
          ...cache,
          data: JSON.stringify(cache.data),
        },
      }),
    false,
  );

  const { data: cachedData } = useQuery(() => get({ uri: baseUri }), true);

  const handleSettingsChange = (data: ListItem[]) => {
    setSettings({
      ...settings,
      data,
    });
  };

  useEffect(() => {
    const storageState = getSettingsFromStorage(props.type);
    console.log('storage state: ', storageState);
    setSettings(storageState);

    if (props.callback) {
      props.callback();
    }
  }, [props.callback]);

  useEffect(() => {
    updateStorageSettings(props.type, settings);
  }, [settings]);

  console.log('SETTINGS: ', settings);

  return [settings.data, handleSettingsChange];
};
