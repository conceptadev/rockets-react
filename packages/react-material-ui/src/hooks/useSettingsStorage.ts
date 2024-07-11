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
  cacheApiUri?: string;
} & Settings;

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

export const useSettingsStorage = ({
  key,
  type,
  assignee,
  data,
  setListCallback,
  cacheApiUri,
}: Props) => {
  const [settingsCache, setSettingsCache] = useState<CacheState>({
    ...initialSettingsState,
    data: getSettingsFromStorage({ key, type, assignee, data }),
  });
  const [settings, setSettings] = useState<CacheState['data']>(() => {
    return getSettingsFromStorage({ key, type, assignee, data });
  });

  const { get, post, patch, del } = useDataProvider();

  const { execute: createCache } = useQuery(
    (cache: Record<string, unknown>) =>
      post({
        uri: cacheApiUri,
        body: {
          key,
          type,
          assignee,
          data: cache,
        },
      }),
    false,
    {
      onSuccess: (res: CacheResponse) =>
        setSettingsCache({
          ...res,
          data: parseDataStringToSettings(res.data),
        }),
    },
  );

  const { execute: updateCache } = useQuery(
    (list: CacheState['data']) =>
      patch({
        uri: `${cacheApiUri}/${settingsCache.id}`,
        body: {
          ...settingsCache,
          data: parseSettingsToDataString(JSON.stringify(list)),
        },
      }),
    false,
    {
      onSuccess: (res: CacheResponse) =>
        setSettingsCache({
          ...res,
          data: parseDataStringToSettings(res.data),
        }),
    },
  );

  const { execute: deleteCache } = useQuery(
    () => del({ uri: `${cacheApiUri}/${settingsCache.id}` }),
    false,
    { onSuccess: () => setSettingsCache(initialSettingsState) },
  );

  useQuery(() => get({ uri: cacheApiUri }), Boolean(cacheApiUri), {
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

  const clearSettings = () => {
    deleteSettingsStorage({ key, type, assignee });
    deleteCache();
  };

  useEffect(() => {
    updateSettingsStorage({
      key,
      type,
      assignee,
      data: settings,
    });

    if (cacheApiUri) {
      updateCache(settings);
    }
  }, [key, settings, cacheApiUri]);

  useEffect(() => {
    setListCallback(settings);
  }, [settings]);

  return { settings, setSettings, clearSettings };
};
