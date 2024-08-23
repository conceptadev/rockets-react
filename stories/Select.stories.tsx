import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@concepta/react-material-ui';

const meta = {
  component: Select,
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  argTypes: {
    containerProps: { control: { type: 'object' } },
    labelProps: { control: { type: 'object' } },
    options: { control: { type: 'object' } },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    error: { control: { type: 'boolean' } },
    helperText: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select an option',
  },
};

export const WithPreselectedValue: Story = {
  args: {
    label: 'Select an option',
    value: 'option2',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select an option',
    disabled: true,
  },
};

export const CustomSize: Story = {
  args: {
    label: 'Select an option',
    size: 'medium',
  },
};

export const Required: Story = {
  args: {
    label: 'Select an option',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select an option',
    helperText: 'Select your preferred option',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Select an option',
    error: true,
    helperText: 'This field is required',
  },
};

export const CustomLabelStyles: Story = {
  args: {
    label: 'Select an option',
    labelProps: {
      color: 'red',
      fontWeight: 'bold',
    },
  },
};

export const CustomContainerStyling: Story = {
  args: {
    label: 'Select an option',
    containerProps: {
      sx: {
        border: '1px solid blue',
        background: '#eee',
        padding: 2,
        borderRadius: '8px',
      },
    },
  },
};
