import React, { FC } from 'react';
import { ContainerWithDrawerProps } from '../ContainerWithDrawer';
import Image from '../../Image';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

interface CustomLogoProps {
  collapsed: boolean;
}

const CustomLogo: FC<CustomLogoProps> = ({ collapsed }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: collapsed ? '40px' : '160px',
        easing: 'theme.transitions.easing.sharp',
        transition: collapsed
          ? theme.transitions.duration.leavingScreen
          : theme.transitions.duration.enteringScreen,
      }}
    >
      <Image src="/msw-expanded.svg" alt="Logo" width="160px" height="auto" />
    </Box>
  );
};

const customDrawer: ContainerWithDrawerProps['drawerCustomToggle'] = (
  toggleDrawer,
  collapsed,
) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'auto',
      marginBottom: '32px',
    }}
  >
    <Box
      onClick={toggleDrawer}
      sx={{
        backgroundColor: '#f0f5f8',
        height: '40px',
        width: '40px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {collapsed ? (
        <ChevronRight sx={{ fontSize: '24px', color: '#a5b8c1' }} />
      ) : (
        <ChevronLeft sx={{ fontSize: '24px', color: '#a5b8c1' }} />
      )}
    </Box>
  </Box>
);

export const MSWContainerWithDrawerProps: Partial<ContainerWithDrawerProps> = {
  logo: (collapsed) => <CustomLogo collapsed={!!collapsed} />,
  backgroundColor: '#f0f5f8',
  drawerCustomToggle: customDrawer,
  drawerBackgroundColor: '#fff',
  drawerCollapsedWidth: 96,
  drawerExpandedWidth: 240,
};
