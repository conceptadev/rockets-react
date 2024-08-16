'use client';

import { createContext, useContext } from 'react';

import { useTranslation } from '../../../utils/i18n';

export type AppBarContextProps = {
  /**
   * Boolean that indicates if the AppBar Drawer is open on a mobile screen.
   */
  isMobileOpen: boolean;
  /**
   * Callback for changing the open state of the AppBar Drawer dinamically.
   */
  toggleMobileOpen: () => void;
};

export const AppBarContext = createContext<AppBarContextProps>(
  {} as AppBarContextProps,
);

/**
 * Custom hook that wraps the implementation of the App Bar Root context.
 */
export const useAppBarRoot = () => {
  const appBarContext = useContext(AppBarContext);
  const { t } = useTranslation();

  if (!appBarContext) {
    throw new Error(t('appBar:noContext'));
  }

  return appBarContext;
};
