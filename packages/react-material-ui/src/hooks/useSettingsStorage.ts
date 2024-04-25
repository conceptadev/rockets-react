import { useState, useEffect } from 'react';

type ListItem = {
  id: string;
  hide: boolean;
};

type Settings = {
  key: string;
  user: string;
  settingsId: string;
  list: ListItem[];
};

export const getPageSettings = ({ key, user, settingsId, list }: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  if (!storageItem) {
    return list;
  }

  const settingsItem = storageItem.find(
    (item: Settings) => item.user === user && item.settingsId === settingsId,
  );

  return settingsItem?.list || [];
};

export const handlePageSettingsUpdate = ({
  key,
  user,
  settingsId,
  list,
}: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  const newSettings = {
    user,
    settingsId,
    list,
  };

  if (!storageItem) {
    localStorage.setItem(key, JSON.stringify([newSettings]));
    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item: Settings) => item.user === user && item.settingsId === settingsId,
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
  settingsId,
  list,
}: Settings) => {
  const [settings, setSettings] = useState(() => {
    return getPageSettings({ key, user, settingsId, list });
  });

  useEffect(() => {
    handlePageSettingsUpdate({
      key,
      user,
      settingsId,
      list: settings,
    });
  }, [key, settings]);

  return [settings, setSettings];
};
