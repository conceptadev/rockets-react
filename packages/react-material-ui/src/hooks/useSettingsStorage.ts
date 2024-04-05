import { useState, useEffect } from 'react';

type ListItem = {
  id: string;
  hide: boolean;
};

type Settings = {
  key: string;
  user: string;
  route: string;
  list: ListItem[];
};

export const getPageSettings = ({
  key,
  user,
  route,
}: Omit<Settings, 'list'>) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  if (!storageItem) {
    return;
  }

  const settingsItem = storageItem.find(
    (item: Settings) => item.user === user && item.route === route,
  );

  return settingsItem?.list || [];
};

export const handlePageSettingsUpdate = ({
  key,
  user,
  route,
  list,
}: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  const newSettings = {
    user,
    route,
    list,
  };

  if (!storageItem) {
    localStorage.setItem(key, JSON.stringify([newSettings]));
    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) => item.user === user && item.route === route,
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
  route,
}: Omit<Settings, 'list'>) => {
  const [settings, setSettings] = useState(() => {
    return getPageSettings({ key, user, route });
  });

  useEffect(() => {
    handlePageSettingsUpdate({
      key,
      user,
      route,
      list: settings,
    });
  }, [key, settings]);

  return [settings, setSettings];
};
