import { useState, useEffect } from 'react';

type ListItem = {
  id: string;
  hide: boolean;
};

type Settings = {
  key: string;
  user: string;
  tableId: string;
  list: ListItem[];
};

export const getPageSettings = ({
  key,
  user,
  tableId,
}: Omit<Settings, 'list'>) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  if (!storageItem) {
    return;
  }

  const settingsItem = storageItem.find(
    (item: Settings) => item.user === user && item.tableId === tableId,
  );

  return settingsItem?.list || [];
};

export const handlePageSettingsUpdate = ({
  key,
  user,
  tableId,
  list,
}: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  const newSettings = {
    user,
    tableId,
    list,
  };

  if (!storageItem) {
    localStorage.setItem(key, JSON.stringify([newSettings]));
    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) => item.user === user && item.tableId === tableId,
  );

  if (settingsItemIndex > -1) {
    storageItem[settingsItemIndex] = newSettings;
  } else {
    storageItem.push(newSettings);
  }

  localStorage.setItem(key, JSON.stringify(storageItem));
};

export const useSettingsStorage = ({
  key,
  user,
  tableId,
}: Omit<Settings, 'list'>) => {
  const [settings, setSettings] = useState(() => {
    return getPageSettings({ key, user, tableId });
  });

  useEffect(() => {
    handlePageSettingsUpdate({
      key,
      user,
      tableId,
      list: settings,
    });
  }, [key, settings]);

  return [settings, setSettings];
};
