import React, { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import { AppBarContext } from './hooks/useAppBarRoot';

export type AppBarRootProps = {
  children: ReactNode;
};

const AppBarRoot = ({ children }: AppBarRootProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileOpen = () => {
    setIsMobileOpen((prv) => !prv);
  };

  return (
    <AppBarContext.Provider
      value={{
        isMobileOpen,
        toggleMobileOpen,
      }}
    >
      <Box sx={{ display: 'flex' }} id="AppBarRoot">
        {children}
      </Box>
    </AppBarContext.Provider>
  );
};

export default AppBarRoot;
