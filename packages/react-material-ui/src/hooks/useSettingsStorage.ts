import { useState, useEffect } from 'react';

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

// type CommonCacheInfo = {
//   id: string;
//   dateCreated: string;
//   dateUpdated: string;
//   dateDeleted?: string;
//   version: number;
//   key: string;
//   type: string;
//   assignee: Assignee;
// };

// type CacheResponse = {
//   data: string;
// } & CommonCacheInfo;

// type CacheState = {
//   data: ListItem[];
// } & CommonCacheInfo;

export const getPageSettings = ({ type, data }: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(type));

  if (!storageItem) {
    return data;
  }

  return storageItem.data;
};

export const handlePageSettingsUpdate = ({
  key,
  type,
  assignee,
  data,
}: Settings) => {
  const newSettings = {
    key,
    type,
    assignee,
    data,
  };

  localStorage.setItem(type, JSON.stringify(newSettings));
};

export const useSettingsStorage = ({ key, type, assignee, data }: Settings) => {
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
  }, [settings]);

  return [settings, setSettings];
};
