import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Notifications } from '@concepta/react-material-ui';

const meta = {
  component: Notifications,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    amount: { control: 'number' },
    // onClick: { type: 'function' },
  },
} satisfies Meta<typeof Notifications>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 1,
    onClick: fn(),
  },
};

export const NoNotifications: Story = {
  args: {
    amount: 0,
  },
};

export const MultipleNotifications: Story = {
  args: {
    amount: 61,
  },
};

export const CustomClickHandler: Story = {
  args: {
    amount: 5,
    onClick: () => alert('Notification icon clicked'),
  },
};
