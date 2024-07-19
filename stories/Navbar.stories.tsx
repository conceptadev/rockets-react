import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Navbar } from '@concepta/react-material-ui';
import { Box, MenuItem } from '@mui/material';

const meta = {
  component: Navbar,
  tags: ['autodocs'],
  args: {
    text: 'John Doe',
    subText: 'Admin',
  },
  argTypes: {
    drawerToggle: {
      type: 'function',
      description: 'Function to call when the drawer toggle button is clicked',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Whether to show the notifications icon',
    },
    notificationsNumber: {
      control: 'number',
      description: 'Number of notifications to display',
    },
    notificationsOnClick: {
      type: 'function',
      description: 'Function to call when the notifications icon is clicked',
    },
    avatar: { control: 'text', description: 'URL of the user avatar' },
    text: {
      control: 'text',
      description: 'Text to display next to the avatar',
    },
    subText: {
      control: 'text',
      description: 'Subtext to display below the text',
    },
    headerMenuOptions: {
      type: 'function',
      description:
        'Function to render the dropdown menu options and handle the close action',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showNotifications: true,
    notificationsNumber: 8,
    notificationsOnClick: fn(),
    avatar: 'https://picsum.photos/40/40',
  },
};

/**
 * Please preview it in a mobile viewPort to see the drawer toggle button.
 */
export const NavbarWithDrawerToggle: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    drawerToggle: fn(),
  },
};

export const NavbarWithNotifications: Story = {
  args: {
    showNotifications: true,
    notificationsNumber: 3,
  },
};

export const NavbarWithUserAccountInfo: Story = {
  args: {
    avatar: 'https://picsum.photos/40/40',
    text: 'John Doe',
    subText: 'Admin',
  },
};

export const NavbarWithCustomStyles: Story = {
  args: {
    sx: {
      backgroundColor: '#93d6ff',
      color: 'white',
      padding: '16px 32px',
    },
  },
};

export const NavbarWithClickableNotifications: Story = {
  args: {
    showNotifications: true,
    notificationsNumber: 5,
    notificationsOnClick: fn(),
  },
};

export const NavbarWithDropdownMenu: Story = {
  args: {
    avatar: 'https://picsum.photos/40/40',
    text: 'John Doe',
    subText: 'Admin',
    headerMenuOptions: (handleClose) => (
      <Box>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Box>
    ),
  },
};
