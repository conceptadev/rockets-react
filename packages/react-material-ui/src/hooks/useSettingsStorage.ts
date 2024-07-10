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

export const getPageSettings = ({ key, type, assignee, data }: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  if (!storageItem) {
    return data;
  }

  const settingsItem = storageItem.find(
    (item: Settings) => item.assignee.id === assignee.id && item.key === key,
  );

  return settingsItem?.data || data;
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
    localStorage.setItem(key, JSON.stringify([newSettings]));
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

  localStorage.setItem(key, JSON.stringify(storageItem));
};

export const useSettingsStorage = ({ key, type, assignee, data }: Props) => {
  const [settings, setSettings] = useState(() => {
    return getPageSettings({ key, type, assignee, data });
  });

  useEffect(() => {
    handlePageSettingsUpdate({
      key,
      type,
      assignee,
      data: settings,
    });
  }, [key, settings]);

  return [settings, setSettings];
};
