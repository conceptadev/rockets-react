import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@concepta/react-material-ui';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    label: { control: 'text' },
    onChange: { action: 'changed' },
    textProps: { control: 'object' },
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Checkbox Label',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Checkbox',
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Checkbox',
  },
};

export const CustomTextProperties: Story = {
  args: {
    label: 'Custom Text Properties',
    textProps: {
      fontSize: 20,
      fontWeight: 700,
      color: 'secondary.main',
    },
  },
};

export const CustomStylesWithSx: Story = {
  args: {
    label: 'Custom Styles with sx',
    sx: {
      border: '1px solid red',
    },
  },
};
