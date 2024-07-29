import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@concepta/react-material-ui';
import { InputAdornment } from '@mui/material';

const meta = {
  component: TextField,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    hiddenLabel: {
      control: 'boolean',
    },
    passwordStrengthConfig: {
      control: 'object',
      description: 'Configuration for password strength indicator.',
    },
    multiline: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'boolean',
      description: 'If true, the label will be displayed in an error state.',
    },
    helperText: {
      control: 'text',
      description: 'The helper text content.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the text field will be disabled.',
    },
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TextField
        onChange={(evt) => setValue(evt.target.value)}
        value={value}
        {...args}
      />
    );
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text field',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Label',
    hiddenLabel: true,
  },
};

export const PasswordToggleVisibility: Story = {
  args: {
    type: 'password',
    label: 'Password',
  },
};

export const PasswordWithStrength: Story = {
  args: {
    type: 'password',
    label: 'Password',
    passwordStrengthConfig: {
      hideStrengthBar: false,
      hideRulesText: false,
    },
  },
};

export const Multiline: Story = {
  args: {
    multiline: true,
    rows: 4,
    label: 'Multiline',
  },
};

export const CustomStyles: Story = {
  args: {
    sx: { backgroundColor: 'lightgray', color: 'blue' },
    label: 'Custom Styles',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width',
  },
};

export const WithInputAdornment: Story = {
  args: {
    label: 'With Adornment',
    InputProps: {
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    },
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Error State',
    error: true,
    helperText: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'With Helper Text',
    helperText: 'Helper text goes here',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    value: 'Disabled input',
  },
};
