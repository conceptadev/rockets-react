import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from '@concepta/react-material-ui';

const meta = {
  component: SelectField,
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    onChange: (value: string | string[] | null) => console.log(value),
    defaultValue: 'option1',
  },
  argTypes: {
    onChange: { action: 'changed' },
    options: { control: 'object' },
    defaultValue: { control: 'text' },
    label: { control: 'text' },
    fullWidth: { control: 'boolean' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    variant: {
      control: { type: 'select', options: ['outlined', 'filled', 'standard'] },
    },
    isLoading: { control: 'boolean' },
    hasAllOption: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutAllOption: Story = {
  args: {
    hasAllOption: false,
  },
};

export const WithPreSelectedValue: Story = {
  args: {
    defaultValue: 'option2',
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Custom Label',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const WithDifferentSize: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
