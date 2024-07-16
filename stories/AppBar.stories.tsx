import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AppBar } from '@concepta/react-material-ui';
import { Box, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import rockets from './assets/rockets.svg';

const Component = (args) => (
  <AppBar.Root {...args}>
    <AppBar.Drawer
      logo={rockets}
      items={[
        {
          icon: <HomeIcon />,
          text: 'Home',
        },
        {
          icon: <PersonIcon />,
          text: 'Profile',
        },
      ]}
    />
    <AppBar.Main>
      <AppBar.Nav
        text={'Super user'}
        subText={'Admin'}
        headerMenuOptions={() => <MenuItem>Sign Out</MenuItem>}
      />
      <Box display="flex" flex={1} p={4} justifyContent="center">
        Main Content
      </Box>
    </AppBar.Main>
  </AppBar.Root>
);

const meta = {
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof AppBar.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The AppBar component was designed to simplify developers' work when starting new projects. It provides a ready-made structure for the main screen, integrating a drawer, navigation bar, and main content area. By automatically handling the logic for expanding and collapsing the drawer menu, the AppBar allows developers to focus on building their application's core features without worrying about layout management.
 *
 * Components of AppBar: <br>
 * AppBarRoot: The root component that sets up the layout structure and context for the AppBar. <br>
 * AppBarDrawer: The drawer component that provides a collapsible side menu for navigation. <br>
 * AppBarNav: The navigation bar component that typically contains the main navigation links. <br>
 * AppBarMain: The main content area where the primary content of the application is displayed. <br>
 */

export const Default: Story = {
  args: {},
};
