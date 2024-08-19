import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { HeaderAccount } from '@concepta/react-material-ui';
import MenuItem from '@mui/material/MenuItem';

const meta = {
  component: HeaderAccount,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof HeaderAccount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    text: 'John Doe',
    subText: 'Admin',
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
  },
};

export const WithLargeAvatar: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    avatarSize: 80,
  },
};

export const WithoutAvatar: Story = {
  args: {
    text: 'John Doe',
    subText: 'Admin',
  },
};

export const WithTextAndSubtext: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    text: 'John Doe',
    subText: 'Admin',
  },
};

export const WithCustomTextStyling: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    text: 'John Doe',
    subText: 'Admin',
    textProps: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'primary.main',
    },
    subTextProps: {
      fontSize: 14,
      color: 'secondary.main',
    },
  },
};

export const WithCustomIconColor: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    text: 'John Doe',
    subText: 'Admin',
    iconColor: 'error.main',
  },
};

export const WithOnClickEvent: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    text: 'John Doe',
    subText: 'Admin',
    onClick: fn(),
  },
};

export const WithMenuOptions: Story = {
  args: {
    avatar: 'https://picsum.photos/200/200',
    text: 'John Doe',
    subText: 'Admin',
    menuOptions: (handleClose) => (
      <>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </>
    ),
  },
};
