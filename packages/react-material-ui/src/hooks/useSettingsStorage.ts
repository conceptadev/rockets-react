import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { useAuth } from '@concepta/react-auth-provider';

type Assignee = {
  id: string;
};

type ListItem = {
  id: string;
  label: string;
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
} & Omit<Settings, 'assignee'>;

const parseDataStringToSettings = (data: string) => {
  return JSON.parse(data.replace(/'/g, '"'));
};

const parseSettingsToDataString = (data: string) => {
  return data.replace(/"/g, "'");
};

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
  data,
  setListCallback,
  cacheApiUri,
}: Props) => {
  const [cacheId, setCacheId] = useState<CacheState['id']>('');
  const [settings, setSettings] = useState<CacheState['data']>([]);

  if (!type) {
    return {
      settings,
      setSettings,
      clearSettings: () => null,
    };
  }

  const auth = useAuth();
  const pathname = usePathname();

  const { get, post, patch, del } = useDataProvider();

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
      post({
        uri: cacheApiUri,
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
    (list: CacheState['data']) =>
      patch({
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
        if (!fetchedData.length) {
          createCache(parseSettingsToDataString(JSON.stringify(data)));
          return;
        }

        const cachedSettings = getSettingsFromCacheList({
          ...cacheConfig,
          cacheList: fetchedData,
        });

        if (cachedSettings) {
          setCacheId(cachedSettings.id);

          if (!settings.length) {
            setSettings(cachedSettings.data);
            setListCallback(cachedSettings.data);
          }
        }
      },
    },
  );

  const clearSettings = () => {
    deleteSettingsStorage(cacheConfig);

    if (cacheApiUri && cacheId) {
      deleteCache();
    }
  };

  useEffect(() => {
    if (settings.length) {
      updateSettingsStorage({
        ...cacheConfig,
        data: settings,
      });

      if (cacheApiUri && cacheId) {
        updateCache(settings);
      }
    }
  }, [settings, cacheApiUri]);

  useEffect(() => {
    const storageData = getSettingsFromStorage(cacheConfig);

    if (storageData.length) {
      setListCallback(storageData);
      setSettings(storageData);
    }

    if (!storageData.length && cacheApiUri) {
      fetchSettingsCache();
    }
  }, []);

  return { settings, setSettings, clearSettings };
};
