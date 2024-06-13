'use client';

import { createContext, useContext } from 'react';

import { useTranslation } from '../../../utils/intl/i18n';

type AppBarContextProps = {
  isMobileOpen: boolean;
  toggleMobileOpen: () => void;
};

export const AppBarContext = createContext<AppBarContextProps>(
  {} as AppBarContextProps,
);

export const useAppBarRoot = () => {
  const appBarContext = useContext(AppBarContext);
  const { t } = useTranslation();

  if (!appBarContext) {
    throw new Error(t('appBar:noContext'));
  }

  return appBarContext;
};
