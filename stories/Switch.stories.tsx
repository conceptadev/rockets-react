import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Switch } from '@concepta/react-material-ui';

const meta = {
  component: Switch,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    label: { control: 'text' },
    onChange: { action: 'changed' },
    textProps: { control: 'object' },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Switch Label',
  },
};

export const CustomLabelStyles: Story = {
  args: {
    label: 'Custom Styled Label',
    textProps: {
      fontSize: 18,
      fontWeight: 600,
      color: 'secondary.main',
    },
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Switch',
    required: true,
  },
};

/**
 * Check the actions tab
 */
export const OnChangeCallback: Story = {
  args: {
    onChange: fn(),
  },
};
