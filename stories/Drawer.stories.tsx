import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerProps,
  DrawerItemProps,
} from '@concepta/react-material-ui';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import rockets from './assets/rockets.svg';

const meta = {
  component: Drawer,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    items: {
      description: 'Array of items to display in the drawer',
      control: 'object',
    },
    currentId: { control: 'text' },
    customToggle: { type: 'function' },
    mobileIsOpen: { control: 'boolean' },
    onMobileClose: { type: 'function' },
    logo: { control: 'text' },
    textProps: {
      description: 'Props for text elements inside the drawer',
      control: 'object',
    },
    sx: { description: 'Custom styles for the drawer', control: 'object' },
    buttonSx: {
      description: 'Custom styles for drawer buttons',
      control: 'object',
    },
    horizontal: {
      description: 'Whether the drawer items should be displayed horizontally',
      control: 'boolean',
    },
    collapsibleIcon: {
      description: 'Icon to use for the collapsible button',
      control: 'object',
    },
    collapsibleIconColor: { control: 'color' },
    collapsibleIconBgColor: { control: 'color' },
    collapsed: { control: 'boolean' },
    onCollapsedChange: { type: 'function' },
    backgroundColor: { control: 'color' },
    iconColor: { control: 'color' },
    activeIconColor: { control: 'color' },
    collapsedWidth: { control: 'range', min: 100, max: 500, step: 5 },
    expandedWidth: { control: 'range', min: 100, max: 500, step: 5 },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const items: DrawerItemProps[] = [
  {
    id: 'home',
    text: 'Home',
    icon: <HomeIcon />,
    onClick: () => alert('Home clicked'),
  },
  {
    id: 'settings',
    text: 'Settings',
    icon: <SettingsIcon />,
    onClick: () => alert('Settings clicked'),
  },
];

export const Default: Story = {
  args: {
    items,
    logo: 'https://via.placeholder.com/80',
    collapsible: true,
    collapsed: false,
  },
};

export const DrawerWithLogoAndItems: Story = {
  args: {
    logo: <img src={rockets} alt="rockets" width={60} height={60} />,
    items,
  },
};

/**
 * Horizontal prop will display the items in a row instead of a column
 */
export const HorizontalDrawer: Story = {
  args: {
    items,
    horizontal: true,
  },
};

export const CollapsedDrawer: Story = {
  args: {
    items,
    collapsed: true,
  },
};

export const CustomStyles: Story = {
  args: {
    items,
    backgroundColor: '#333',
    iconColor: '#ff0000',
    activeIconColor: '#0f0',
    sx: { padding: '10px' },
  },
};

export const CustomCollapsibleIcon: Story = {
  args: {
    items,
    collapsibleIcon: (collapsed) =>
      collapsed ? <LockOpenOutlined /> : <LockOutlined />,
    collapsibleIconBgColor: '#333',
    collapsibleIconColor: '#ee4400',
  },
};

export const CustomToggleButton: Story = {
  args: {
    items,
    customToggle: (toggleDrawer, collapsed) => (
      <button onClick={toggleDrawer}>
        {collapsed ? 'Expand' : 'Collapse'}
      </button>
    ),
  },
};

export const WithActiveItem: Story = {
  args: {
    items,
    currentId: 'home',
  },
};

export const WithTextProperties: Story = {
  args: {
    items,
    textProps: { fontSize: 18, color: 'red' },
  },
};

export const CustomWidths: Story = {
  args: {
    items,
    collapsedWidth: 200,
    expandedWidth: 300,
  },
};
