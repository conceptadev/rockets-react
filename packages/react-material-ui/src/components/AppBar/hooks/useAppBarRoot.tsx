'use client';

import { createContext, useContext } from 'react';

type AppBarContextProps = {
  isMobileOpen: boolean;
  toggleMobileOpen: () => void;
};

export const AppBarContext = createContext<AppBarContextProps>(
  {} as AppBarContextProps,
);

export const useAppBarRoot = () => {
  const appBarContext = useContext(AppBarContext);

  if (!appBarContext) {
    throw new Error('You must use table root under AppBarContext');
  }

  return appBarContext;
};
