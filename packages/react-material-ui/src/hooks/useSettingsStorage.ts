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

const parseDataStringToSettings = (data: string) => {
  return JSON.parse(data.replace(/'/g, '"'));
};

const parseSettingsToDataString = (data: string) => {
  return data.replace(/"/g, "'");
};

const getSettingsFromStorage = ({ key, type, assignee, data }: Settings) => {
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

  if (!settingsItem) {
    return null;
  }

  return {
    ...settingsItem,
    data: parseDataStringToSettings(settingsItem.data),
  };
};

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

export const useSettingsStorage = ({
  key,
  type,
  assignee,
  data,
  setListCallback,
}: Props) => {
  const [settingsCache, setSettingsCache] = useState<CacheState>({
    ...initialSettingsState,
    data: getSettingsFromStorage({ key, type, assignee, data }),
  });
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
          data: parseDataStringToSettings(creationData.data),
        }),
    },
  );

  const { execute: updateCache } = useQuery(
    (list: CacheState['data']) =>
      patch({
        uri: `${baseUri}/${settingsCache.id}`,
        body: {
          ...settingsCache,
          data: parseSettingsToDataString(JSON.stringify(list)),
        },
      }),
    false,
    {
      onSuccess: (updateData: CacheResponse) =>
        setSettingsCache({
          ...updateData,
          data: parseDataStringToSettings(updateData.data),
        }),
    },
  );

  useQuery(() => get({ uri: baseUri }), true, {
    onSuccess: (fetchedData: CacheResponse[]) => {
      if (!fetchedData.length) {
        createCache(parseSettingsToDataString(JSON.stringify(data)));
      } else {
        const cachedSettings = getSettingsFromCacheList({
          key,
          type,
          assignee,
          cacheList: fetchedData,
        });
        setSettingsCache(cachedSettings);
        setSettings(cachedSettings.data);
      }
    },
  });

  useEffect(() => {
    updateSettingsStorage({
      key,
      type,
      assignee,
      data: settings,
    });
    updateCache(settings);
  }, [key, settings]);

  useEffect(() => {
    setListCallback(settings);
  }, [settings]);

  return { settings, setSettings };
};
