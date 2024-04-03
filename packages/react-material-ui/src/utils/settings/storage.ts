import { ListItem } from 'components/OrderableDropDown';

type Settings = {
  key: string;
  user: string;
  route: string;
  list: ListItem[];
};

export const handlePageSettingsUpdate = ({
  key,
  user,
  route,
  list,
}: Settings) => {
  const storageItem = JSON.parse(localStorage.getItem(key));

  if (!storageItem) {
    localStorage.setItem(
      key,
      JSON.stringify([
        {
          user,
          route,
          list,
        },
      ]),
    );

    return;
  }

  const settingsItemIndex = storageItem.findIndex(
    (item) => item.user === user && item.route === route,
  );

  const newSettings = {
    user,
    route,
    list,
  };

  if (settingsItemIndex > -1) {
    storageItem[settingsItemIndex] = newSettings;
  } else {
    storageItem.push(newSettings);
  }

  localStorage.setItem(key, JSON.stringify(storageItem));
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
    (item) => item.user === user && item.route === route,
  );

  return settingsItem.list || [];
};
